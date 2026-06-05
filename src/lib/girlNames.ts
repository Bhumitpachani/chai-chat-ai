export const INDIAN_GIRL_NAMES = [
  "Aaradhya", "Ananya", "Aisha", "Anushka", "Aditi", "Avni", "Bhavya", "Diya",
  "Esha", "Gauri", "Ishita", "Jiya", "Kavya", "Kiara", "Lavanya", "Mahi",
  "Meera", "Myra", "Nandini", "Navya", "Niharika", "Pari", "Pihu", "Priya",
  "Radhika", "Riya", "Saanvi", "Sahana", "Sanya", "Shanaya", "Shreya", "Siya",
  "Tara", "Tanvi", "Trisha", "Urvi", "Vanya", "Vedika", "Yashika", "Zara",
  "Inaya", "Anaya", "Aarohi", "Mira", "Naina", "Sneha", "Pooja", "Ritika",
  "Suhani", "Tanya",
];

const STORAGE_KEY = "used_girl_names";

export function pickUniqueGirlName(): string {
  if (typeof window === "undefined") return INDIAN_GIRL_NAMES[0];
  let used: string[] = [];
  try {
    used = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {}
  let pool = INDIAN_GIRL_NAMES.filter((n) => !used.includes(n));
  if (pool.length === 0) {
    used = [];
    pool = INDIAN_GIRL_NAMES;
  }
  const pick = pool[Math.floor(Math.random() * pool.length)];
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...used, pick]));
  return pick;
}
