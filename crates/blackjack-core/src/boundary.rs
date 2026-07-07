use crate::{
    apply_action, current_legal_actions, start_round, start_session, Action, Ruleset,
    SessionState,
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
}

#[derive(Clone, Debug, Deserialize, PartialEq, Serialize)]
#[serde(tag = "type", content = "data", rename_all = "snake_case")]
pub enum CoreResponse {
    Session(SessionState),
    Actions(Vec<Action>),
}

pub fn handle_command(command: CoreCommand) -> Result<CoreResponse, String> {
    match command {
        CoreCommand::StartSession {
            seed,
            bankroll,
            default_bet,
            ruleset,
        } => start_session(&seed, bankroll, default_bet, ruleset).map(CoreResponse::Session),
        CoreCommand::StartRound { mut session, bet } => start_round(&mut session, bet).map(|()| {
            CoreResponse::Session(session)
        }),
        CoreCommand::LegalActions { session } => {
            current_legal_actions(&session).map(CoreResponse::Actions)
        }
        CoreCommand::ApplyAction { mut session, action } => {
            apply_action(&mut session, action).map(|()| CoreResponse::Session(session))
        }
    }
}
