// features/family/FamilyProgress.js
export default function FamilyProgress() {
  const [familyMembers, setFamilyMembers] = useState([]);
  
  return (
    <div>
      <h3>Maendeleo ya Familia</h3>
      {familyMembers.map(member => (
        <MemberProgress key={member.id} member={member} />
      ))}
    </div>
  );
}