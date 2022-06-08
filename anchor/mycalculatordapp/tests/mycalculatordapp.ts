import { Mycalculatordapp } from "./../target/types/mycalculatordapp";
// import * as anchor from "@project-serum/anchor";
// import { Program } from "@project-serum/anchor";
// import { Mycalculatordapp } from "../target/types/mycalculatordapp";

// describe("mycalculatordapp", () => {
//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.AnchorProvider.env());

//   const program = anchor.workspace.Mycalculatordapp as Program<Mycalculatordapp>;

//   it("Is initialized!", async () => {
//     // Add your test here.
//     const tx = await program.methods.initialize().rpc();
//     console.log("Your transaction signature", tx);
//   });
// });

import assert from "assert";
import * as anchor from "@project-serum/anchor";

const { SystemProgram } = anchor.web3;

describe("mycalculatordapp", () => {
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);
  const calculator = anchor.web3.Keypair.generate();
  const program = anchor.workspace.Mycalculatordapp;
  it("Creates a calculator", async () => {
    const initialMessage = "Welcome to Solana!";
    await program.rpc.create(initialMessage, {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [calculator],
    });
    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.greeting === initialMessage);
  });
});
