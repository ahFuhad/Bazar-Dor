export default function LiveDate() {
  const today = new Date();

  const days = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ];
  const months = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];

  const toBengaliNumber = (num: number) => {
    const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num
      .toString()
      .split("")
      .map((d) => bnDigits[parseInt(d, 10)] || d)
      .join("");
  };

  const dayName = days[today.getDay()];
  const dayNum = toBengaliNumber(today.getDate());
  const monthName = months[today.getMonth()];
  const yearNum = toBengaliNumber(today.getFullYear());

  return (
    <div className="text-xs text-[#1D271F]/60">
      {dayName}, {dayNum} {monthName} {yearNum}
    </div>
  );
}
