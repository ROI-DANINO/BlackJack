use crate::{
    Action, HandFacts, PresetCard, Ruleset, SessionState, apply_action, current_legal_actions,
    describe_hand, reshuffle_shoe, start_round, start_session, start_session_with_prefix,
};
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Deserialize, PartialEq, Serialize)]
#[serde(tag = "command", rename_all = "snake_case")]
pub enum CoreCommand {
    StartSession {
        seed: String,
        bankroll: i32,
        default_bet: i32,
        ruleset: Option<Ruleset>,
    },
    StartSessionWithPrefix {
        seed: String,
        bankroll: i32,
        default_bet: i32,
        ruleset: Option<Ruleset>,
        prefix: Vec<PresetCard>,
    },
    StartRound {
        session: SessionState,
        bet: Option<i32>,
    },
    LegalActions {
        session: SessionState,
    },
    ApplyAction {
        session: SessionState,
        action: Action,
    },
    Reshuffle {
        session: SessionState,
    },
    DescribeHand {
        cards: Vec<PresetCard>,
    },
}

#[derive(Clone, Debug, Deserialize, PartialEq, Serialize)]
#[serde(tag = "type", content = "data", rename_all = "snake_case")]
pub enum CoreResponse {
    Session(Box<SessionState>),
    Actions(Vec<Action>),
    HandFacts(HandFacts),
}

pub fn handle_command(command: CoreCommand) -> Result<CoreResponse, String> {
    match command {
        CoreCommand::StartSession {
            seed,
            bankroll,
            default_bet,
            ruleset,
        } => start_session(&seed, bankroll, default_bet, ruleset)
            .map(|session| CoreResponse::Session(Box::new(session))),
        CoreCommand::StartSessionWithPrefix {
            seed,
            bankroll,
            default_bet,
            ruleset,
            prefix,
        } => start_session_with_prefix(&seed, bankroll, default_bet, ruleset, prefix)
            .map(|session| CoreResponse::Session(Box::new(session))),
        CoreCommand::StartRound { mut session, bet } => {
            start_round(&mut session, bet).map(|()| CoreResponse::Session(Box::new(session)))
        }
        CoreCommand::LegalActions { session } => {
            current_legal_actions(&session).map(CoreResponse::Actions)
        }
        CoreCommand::ApplyAction {
            mut session,
            action,
        } => apply_action(&mut session, action).map(|()| CoreResponse::Session(Box::new(session))),
        CoreCommand::Reshuffle { mut session } => {
            reshuffle_shoe(&mut session).map(|()| CoreResponse::Session(Box::new(session)))
        }
        CoreCommand::DescribeHand { cards } => Ok(CoreResponse::HandFacts(describe_hand(&cards))),
    }
}

#[derive(Serialize)]
#[serde(tag = "status", rename_all = "snake_case")]
enum Envelope<T: Serialize> {
    Ok { response: T },
    Error { message: String },
}

/// Parse one command, run it, and return the `{status,...}` envelope as a JSON string.
/// This is the single JSON entry point shared by the CLI and the WASM build.
pub fn dispatch_json(input: &str) -> String {
    let command: CoreCommand = match serde_json::from_str(input) {
        Ok(command) => command,
        Err(error) => return error_envelope(format!("invalid command json: {error}")),
    };
    match handle_command(command) {
        Ok(response) => serde_json::to_string(&Envelope::Ok { response }).unwrap_or_else(|error| {
            error_envelope(format!("failed to serialize response: {error}"))
        }),
        Err(message) => error_envelope(message),
    }
}

/// Build an `{"status":"error","message":...}` envelope string.
pub fn error_envelope(message: String) -> String {
    serde_json::to_string(&Envelope::<()>::Error { message })
        .unwrap_or_else(|_| r#"{"status":"error","message":"unserializable error"}"#.to_string())
}
