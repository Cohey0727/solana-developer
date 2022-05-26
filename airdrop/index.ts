import { Connection, PublicKey, Keypair, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";

const wallet = new Keypair();

const publicKey = wallet.publicKey;
const secretKey = wallet.secretKey;

const getWalletBalance = async (publicKey: PublicKey) => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const walletBalance = await connection.getBalance(publicKey);
  return walletBalance;
};

const airdrop = async (publicKey: PublicKey, lamports: number) => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const fromAirdropSignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL);
};

async function main() {
  const balance = await getWalletBalance(publicKey);
}
