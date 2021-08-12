const statuses = {
  sent: "sent",
  error: "error",
  confirmed: "confirmed",
  receipt: "receipt",
};

export const attachTansactionHandlers = async (emitter) => {
  emitter
    .once("sending", onTransactionSent)
    .once("sent", onTransactionSent)
    .once("receipt", onTransactionReceipt)
    .once("confirmation", onTransactionConfirmed)
    .once("error", onTransactionError);

  emitter.emit("sent");
};

function updateTransactionStatus(status, message = "") {
  console.log("current transaction status:", status, message);
}

function onTransactionSent() {
  updateTransactionStatus(statuses.sent, "Your transaction is sent");
}

function onTransactionReceipt(receipt) {
  updateTransactionStatus(statuses.receipt, receipt);
}

function onTransactionError(error) {
  updateTransactionStatus(statuses.error, error);
}

function onTransactionConfirmed() {
  updateTransactionStatus(statuses.confirmed);
}
