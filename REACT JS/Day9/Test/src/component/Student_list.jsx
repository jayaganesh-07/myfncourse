const Student_list = ({ list }) => {
  return (
    <div className="flex gap-5 flex-wrap">
      {list.map((e) => (
        <div
          key={e.id}
          className="border p-5 rounded bg-orange-200 w-52"
        >
          <h2>ID : {e.id}</h2>
          <h2>Name : {e.name}</h2>
          <h2>Course : {e.course}</h2>
        </div>
      ))}
    </div>
  );
};

export default Student_list;