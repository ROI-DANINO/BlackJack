use blackjack_core::{dispatch_json, error_envelope};
use std::io::{self, Read};

fn main() {
    let mut input = String::new();
    if let Err(error) = io::stdin().read_to_string(&mut input) {
        println!(
            "{}",
            error_envelope(format!("failed to read stdin: {error}"))
        );
        return;
    }
    println!("{}", dispatch_json(&input));
}
