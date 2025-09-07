// async function loadStudents() {
//   const res = await fetch("/api/students");
//   const data = await res.json();

//   const list = document.getElementById("studentList");
//   list.innerHTML = "";

//   data.forEach(s => {
//     const li = document.createElement("li");
//     li.textContent = `${s.name} - ${s.email} - ${s.course}`;
//     list.appendChild(li);
//   });
// }

// window.onload = loadStudents;
async function loadStudents() {
  const res = await fetch("/students"); // REST API endpoint
  const data = await res.json();

  const tbody = document.getElementById("studentsTableBody");
  tbody.innerHTML = "";

  if (data.length === 0) {
    document.getElementById("emptyState").style.display = "block";
    return;
  } else {
    document.getElementById("emptyState").style.display = "none";
  }

  data.forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <div class="student-avatar">${s.name.charAt(0).toUpperCase()}</div>
        <div class="student-info">
          <div class="student-name">${s.name}</div>
          <div class="student-id">ID: ${s.id}</div>
        </div>
      </td>
      <td>${s.email}</td>
      <td><span class="course-badge">${s.course}</span></td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById("totalCount").textContent = data.length;
  document.getElementById("activeCount").textContent = data.length; // or filter by active
}

window.onload = loadStudents;

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('#studentsTableBody tr');

    rows.forEach(row => {
        const name = row.querySelector('.student-name').textContent.toLowerCase();
        const email = row.children[1].textContent.toLowerCase();
        const course = row.querySelector('.course-badge').textContent.toLowerCase();

        if (name.includes(filter) || email.includes(filter) || course.includes(filter)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});