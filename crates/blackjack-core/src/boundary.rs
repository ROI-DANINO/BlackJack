use crate::{
    Action, Ruleset, SessionState, apply_action, current_legal_actions, start_round,
    start_session,
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
        } => start_session(&seed, bankroll * 2, default_bet * 2, ruleset)
            .map(scale_session_out)
            .map(CoreResponse::Session),
        CoreCommand::StartRound { mut session, bet } => {
            scale_session_in_place(&mut session, 2);
            start_round(&mut session, bet.map(|value| value * 2))?;
            scale_session_in_place(&mut session, 1);
            Ok(CoreResponse::Session(session))
        }
        CoreCommand::LegalActions { session } => {
            current_legal_actions(&scale_session_in(session)).map(CoreResponse::Actions)
        }
        CoreCommand::ApplyAction {
            mut session,
            action,
        } => {
            scale_session_in_place(&mut session, 2);
            apply_action(&mut session, action)?;
            scale_session_in_place(&mut session, 1);
            Ok(CoreResponse::Session(session))
        }
    }
}

fn scale_session_out(mut session: SessionState) -> SessionState {
    scale_session_in_place(&mut session, 1);
    session
}

fn scale_session_in(mut session: SessionState) -> SessionState {
    scale_session_in_place(&mut session, 2);
    session
}

fn scale_session_in_place(session: &mut SessionState, divisor: i32) {
    session.bankroll = scale_value(session.bankroll, divisor);
    session.default_bet = scale_value(session.default_bet, divisor);

    if let Some(round) = &mut session.round {
        round.bet = scale_value(round.bet, divisor);
        round.bankroll_before = scale_value(round.bankroll_before, divisor);
        for hand in &mut round.hands {
            hand.wager = scale_value(hand.wager, divisor);
        }
    }

    for log in &mut session.logs {
        log.bankroll_before = scale_value(log.bankroll_before, divisor);
        log.bankroll_after = scale_value(log.bankroll_after, divisor);
        log.bankroll_delta = scale_value(log.bankroll_delta, divisor);
        for outcome in &mut log.outcomes {
            outcome.wager = scale_value(outcome.wager, divisor);
            outcome.delta = scale_value(outcome.delta, divisor);
        }
    }
}

fn scale_value(value: i32, divisor: i32) -> i32 {
    if divisor == 1 { value / 2 } else { value * 2 }
}
