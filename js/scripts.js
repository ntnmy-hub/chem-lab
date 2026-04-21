let selected = [];
let selectedElements = [];

// ===== DATA =====
const acids = ["HCl", "H2SO4", "CH3COOH"];
const bases = ["NaOH", "Ba(OH)2"];
const indicators = ["Quỳ tím", "Phenolphtalein"];

// bảng phản ứng
const reactions = {
  // ===== TRUNG HÒA =====
  "Ba(OH)2+H2SO4": { text: "BaSO4 ↓ + 2H2O", color: "#ffffff"},
  "HCl+NaOH": { text: "NaCl + H2O", color: "#00e5ff" },
  "HCl+Ba(OH)2": { text: "BaCl2 + 2H2O" },
  "CH3COOH+NaOH": { text: " CH3COONa + H2O" },
  "H2SO4+NaOH": { text: " Na2SO4 + 2H2O" },
  "Ba(OH)2+CH3COOH": { text: "(CH3COO)2Ba + 2H2O" },


  // ===== KIM LOẠI + ACID =====
  "Zn+HCl": { text: "💨 ZnCl2 + H2 ↑", gas: true },
  "Na+HCl": { text: "💥 NaCl + H2 ↑ (mạnh)", gas: true },
  "K+HCl": { text: "💥 KCl + H2 ↑ (rất mạnh)", gas: true },
  "Al+HCl": { text: "💨 2AlCl3 + 3H2 ↑", gas: true },
  "Fe+HCl": { text: "💨 FeCl2 + H2 ↑", gas: true },
  "Mg+HCl": { text: "💨 MgCl2 + H2 ↑", gas: true },
  "Zn+H2SO4": { text: "💨 ZnSO4 + H2 ↑", gas: true },
  "Fe+H2SO4": { text: "💨 FeSO4 + H2 ↑", gas: true },
  "Mg+H2SO4": { text: "💨 MgSO4 + H2 ↑", gas: true },

  // ===== KIM LOẠI + CH3COOH =====
  "Zn+CH3COOH": { text: "💨 Zn(CH3COO)2 + H2 ↑", gas: true },
  "Fe+CH3COOH": { text: "💨 Fe(CH3COO)2 + H2 ↑", gas: true },
  "Mg+CH3COOH": { text: "💨 Mg(CH3COO)2 + H2 ↑", gas: true },
  "Al+CH3COOH": { text: "💨 Al(CH3COO)3 + H2 ↑", gas: true },
  "Na+CH3COOH": { text: "💥 CH3COONa + H2 ↑ (mạnh)", gas: true },
  "K+CH3COOH": { text: "💥 CH3COOK + H2 ↑ (rất mạnh)", gas: true },

  // ===== KIM LOẠI MẠNH =====
  "Na+H2O": { text: "NaOH + H2 ↑ (rất mạnh)", gas: true },
  "K+H2O": { text: "KOH + H2 ↑ (rất mạnh)", gas: true },

  // ===== KIM LOẠI + MUỐI =====
  "Fe+CuCl2": { text: "🧱 FeCl2 + Cu" },
  "Zn+CuSO4": { text: "🧱 ZnSO4 + Cu" },
  "Fe+AgNO3": { text: "🧱 Fe(NO3)2 + Ag" },
  "Zn+AgNO3": { text: "🧱 Zn(NO3)2 + Ag" },
  "Mg+AgNO3": { text: "🧱 Mg(NO3)2 + Ag" },
  "Al+AgNO3": { text: "🧱 Al(NO3)3 + Ag" },

  // ===== MUỐI + ACID =====
  "BaCl2+H2SO4": { text: "BaSO4 ↓ + 2HCl", color: "#ffffff" },
  "Na2CO3+HCl": { text: "💨 CO2 ↑ + H2O + NaCl", gas: true },
  "Na2CO3+CH3COOH": { text: "💨 CO2 ↑ + H2O + CH3COONa", gas: true },
  "H2SO4+Na2CO3": { text: "💨 CO2 ↑ + H2O + Na2SO4", gas: true },

  // ===== MUỐI + MUỐI =====
  "AgNO3+NaCl": { text: "AgCl ↓", color: "#ffffff" },
  "AgNO3+BaCl2": { text: "AgCl ↓ + Ba(NO3)2", color: "#ffffff" },
  "BaCl2+Na2SO4": { text: "BaSO4 ↓", color: "#eeeeee" },
  "CuCl2+NaOH": { text: "Cu(OH)2 ↓", color: "#66ccff" },

  // ===== MUỐI + BASE =====
  "FeCl2+NaOH": { text: "Fe(OH)2 ↓", color: "#66ff66" },
  "CuSO4+Ba(OH)2": { text: "⬇️⬇️ Cu(OH)2 + BaSO4", color: "#66ccff" },
  "CuSO4+NaOH": { text: "Cu(OH)2 ↓", color: "#66ccff" },
  "Ba(OH)2+Na2SO4": { text: "BaSO4 ↓ + 2NaOH", color: "#ffffff" },
  "Ba(OH)2+FeCl2": { text: "Fe(OH)2 ↓ + BaCl2", color: "#66ff66" },
  "Ba(OH)2+CuCl2": { text: "Cu(OH)2 ↓ + BaCl2", color: "#66ccff" },
  "CuCl2+NaOH": { text: "Cu(OH)2 ↓ + 2NaCl", color: "#66ccff" },

};

// ===== START =====
function start() {
  const welcome = document.getElementById("welcome");
  const lab = document.getElementById("lab");

  welcome.style.opacity = "0";
  lab.style.display = "block";

  setTimeout(() => {
    lab.style.opacity = "1";
    lab.style.pointerEvents = "auto";
  }, 50);

  setTimeout(() => {
    welcome.style.display = "none";
  }, 600);
}

// ===== SELECT =====
function select(el, chem) {
  if (selected.length < 2) {
    selected.push(chem);
    selectedElements.push(el);
    el.classList.add("selected");
  }

  if (selected.length === 2) {
    setTimeout(() => {
      react(selected[0], selected[1]);
      reset();
    }, 500);
  }
}

function reset() {
  selected = [];
  selectedElements.forEach(el => el.classList.remove("selected"));
  selectedElements = [];
}

// ===== INDICATOR =====
function checkIndicator(a, b) {
  const liquid = document.querySelector('.liquid');
  if (a === "Quỳ tím" || b === "Quỳ tím") {
    if (acids.includes(a) || acids.includes(b)) {
      liquid.style.background = "#ff6b81"; 
      return "Quỳ tím → đỏ (acid)";
    }
    if (bases.includes(a) || bases.includes(b)) {
      liquid.style.background = "#18455a";
      return "Quỳ tím → xanh (base)";
    }
    return "Không đổi màu";
  }

  if (a === "Phenolphtalein" || b === "Phenolphtalein") {
    if (bases.includes(a) || bases.includes(b)) {
      liquid.style.background = "pink"; 
      return "Hóa hồng (base)";
    }
    return "Không màu";
  }

  return null;
}

// ===== REACT =====
function react(a, b) {
  const liquid = document.querySelector('.liquid');

  // reset màu
  liquid.style.background = "linear-gradient(to top, #00e5ff, #2196f3)";

  // ===== CHECK CHỈ THỊ =====
  const indicator = checkIndicator(a, b);
  if (indicator) {
    document.getElementById("result").innerText = "Kết quả: " + indicator;
    return;
  }

  // ===== CU KHÔNG PHẢN ỨNG VỚI ACID =====
  if (
    (a === "Cu" && acids.includes(b)) ||
    (b === "Cu" && acids.includes(a))
  ) {
    document.getElementById("result").innerText = "Kết quả: ❌ Cu không phản ứng";
    return;
  }

  // ===== TÌM PHẢN ỨNG =====
  const key1 = a + "+" + b;
  const key2 = b + "+" + a;

  let reaction = reactions[key1] || reactions[key2];

  if (reaction) {
    document.getElementById("result").innerText = "Kết quả: " + reaction.text;

    if (reaction.color) {
      liquid.style.background = reaction.color;
    }

    if (reaction.gas) {
      showGasEffect(); 
    }

    showEffect();
  } else {
    document.getElementById("result").innerText = "Kết quả: Không có phản ứng";
  }
}

// ===== EFFECT =====
function showEffect() {
  const table = document.getElementById("table");

  for (let i = 0; i < 10; i++) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.style.left = Math.random() * 100 + "%";
    bubble.style.bottom = "0";
    table.appendChild(bubble);

    setTimeout(() => bubble.remove(), 1000);
  }
}

// ===== ACCORDION =====
function toggleGroup(title) {
  const group = title.nextElementSibling;

  document.querySelectorAll('.group').forEach(g => {
    if (g !== group) g.classList.remove('active');
  });

  group.classList.toggle('active');
}

function showGasEffect() {
  const beaker = document.querySelector('.beaker');

  for (let i = 0; i < 15; i++) {
    const bubble = document.createElement("div");
    bubble.className = "gas-bubble";

    bubble.style.left = Math.random() * 90 + "%";
    bubble.style.animationDuration = (1 + Math.random()) + "s";

    beaker.appendChild(bubble);

    setTimeout(() => bubble.remove(), 1500);
  }
}
