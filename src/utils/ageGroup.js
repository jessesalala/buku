export function getAgeGroup(birthDate) {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }

  if (age < 18) {
    return "NGUVU YA BUKU TOTO";
  } else if (age >= 18 && age <= 35) {
    return "NGUVU YA BUKU YOUTH";
  } else if (age >= 36 && age <= 50) {
    return "NGUVU YA BUKU ADULT";
  } else {
    return "NGUVU YA BUKU RETIREE";
  }
}