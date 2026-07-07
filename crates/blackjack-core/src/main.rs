use blackjack_core::{CoreCommand, handle_command};
use serde::Serialize;
use std::io::{self, Read};

#[derive(Serialize)]
#[serde(tag = "status", rename_all = "snake_case")]
enum CliOutput<T: Serialize> {
    Ok { response: T },
    Error { message: String },
}

fn main() {
    let mut input = String::new();
    if let Err(error) = io::stdin().read_to_string(&mut input) {
        print_error(format!("failed to read stdin: {error}"));
        return;
    }

    let command: CoreCommand = match serde_json::from_str(&input) {
        Ok(command) => command,
        Err(error) => {
            print_error(format!("invalid command json: {error}"));
            return;
        }
    };

    match handle_command(command) {
        Ok(response) => {
            println!(
                "{}",
                serde_json::to_string(&CliOutput::Ok { response }).expect("serialize response")
            );
        }
        Err(message) => print_error(message),
    }
}

fn print_error(message: String) {
    println!(
        "{}",
        serde_json::to_string(&CliOutput::<()>::Error { message }).expect("serialize error")
    );
}
