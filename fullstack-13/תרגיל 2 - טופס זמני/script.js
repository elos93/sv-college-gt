const KEY = "formDraft";
const form = document.getElementById("draft-form");
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const resetBtn = document.getElementById("reset-btn");

function readDraft() {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : { name: "", email: "" };
  } catch {
    return { name: "", email: "" };
  }
}

function writeDraft(draft) {
  sessionStorage.setItem(KEY, JSON.stringify(draft));
}

function fillFromDraft() {
  const draft = readDraft();
  nameEl.value = draft.name || "";
  emailEl.value = draft.email || "";
}

function onChange() {
  const draft = {
    name: nameEl.value,
    email: emailEl.value,
  };
  writeDraft(draft);
}

function resetDraft() {
  sessionStorage.removeItem(KEY);
  nameEl.value = "";
  emailEl.value = "";
  nameEl.focus();
}

[nameEl, emailEl].forEach((inp) => inp.addEventListener("input", onChange));
resetBtn.addEventListener("click", resetDraft);

fillFromDraft();
