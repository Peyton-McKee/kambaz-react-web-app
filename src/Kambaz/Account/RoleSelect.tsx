const RoleSelect = ({
  onChange,
  role,
}: {
  onChange: (role: string) => void;
  role: string;
}) => {
  return (
    <select
      value={role}
      onChange={(e) => onChange(e.target.value)}
      className="form-select float-start w-25 wd-select-role"
    >
      <option value="">All Roles</option>
      <option value="STUDENT">Students</option>
      <option value="TA">Assistants</option>
      <option value="FACULTY">Faculty</option>
      <option value="ADMIN">Administrators</option>
    </select>
  );
};

export default RoleSelect;
