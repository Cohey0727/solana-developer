import { Mycalculatordapp } from "./../target/types/mycalculatordapp";

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
    console.log("Hello0");
    console.log(account.result.toString());
  });

  it("Add two numbers", async () => {
    await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });
    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.result.eq(new anchor.BN(5)));
  });

  it("Subtract two numbers", async () => {
    await program.rpc.sub(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });
    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.result.eq(new anchor.BN(-1)));
  });

  it("Multiplicate two numbers", async () => {
    await program.rpc.mul(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });
    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.result.eq(new anchor.BN(6)));
  });

  it("Divide two numbers", async () => {
    await program.rpc.div(new anchor.BN(13), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });
    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );

    assert.ok(account.result.eq(new anchor.BN(4)));
    assert.ok(account.remainder.eq(new anchor.BN(1)));
  });
});
