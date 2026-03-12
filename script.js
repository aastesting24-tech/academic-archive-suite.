const courseData = {
  "MA_Economics": {
    "Regulation": "1JLEOUWOWrzzZthJjx831Dqv5cORkm0_R",
    "Sem1": "1NJAtpDpz0Rd4XSdPBLtkh0kaK8Hmxw25",
    "Sem2": "1kWrV8lOg7LGSRc5j9uohE4DdJfzanA2w",
    "Sem3": "11-wXz9NYT_DUUvbMVgfXayMK-MyBK4yf",
    "Sem4": "1YCLyBbfDVqLWkErrrcS6_kwKRN_wL998"
  },
  "MA_English": {
    "Regulation": "122RGMZ7aKT1FHoTvFktEUSurSk5-uA4Q",
    "Sem1": "1aSzbGy5ejzbrYwTUwkWrH-cgL6bLB0VT",
    "Sem2": "1ptpuRaWBeoSrXShUOtrQh5bQf8zonHR8",
    "Sem3": "1TXQo4hCtNk4_oSoFk_A98erbnrFLJ00_",
    "Sem4": "1iwTTRRU7SGtWyHmoxn6dBadG9a5p9r9X"
  },
  "MA_Mathematics": {
    "Regulation": "1zI4y4KdsFKPW8YMRRLHblZxlllRqrXaC",
    "Sem1": "150UvzyvWbQ3a9vlxVWPGZE3qy6OrXj-7",
    "Sem2": "1S6foaOs6u4m_5qsA6KC_SwEz09CVgOpy",
    "Sem3": "11AsxTZSrOTLeMdZjfsH2mPc-dLiJSxkI",
    "Sem4": "1q6eVJED8_ZUcfk71ri8cHG_VZe0B089V"
  },
  "MA_Political_Science": {
    "Regulation": "1-xTsqg4gy7vRz6muY5tZXMalQkg3FwLL",
    "Sem1": "1NdK5z8hqLabc5fvwAloRKoIXB4_K2IGr",
    "Sem2": "16EgZZ5O7SnU3uXereivsldRVjW5psSUa",
    "Sem3": "1b4SV_iQoXxzV5r9oS63eSChd_MHXzByz",
    "Sem4": "15gUOMlNHG9r5c9Ken3q8wX8SIwYT2zQX"
  },
  "MBA": {
    "Regulation": "16_izNi8Jb56wiiYcOKUmHU3FaoWOBj03",
    "Sem1": "1MARcZQh2-_GsT3oKi0oHHRESAoS1ji7b",
    "Sem2": "1HYAN1iF_yxP1DEg4mrV9lRCdC8a4VUFf",
    "Sem3": "1cPzNfREh6iUZW3bL-AumDNJay40kUHfp",
    "Sem4": "1juQvLvc3ISYnPqM3ZXTyUA1GJzo8aZrm"
  },
  "MCA": {
    "Regulation": "1neaq1zqzr8qG4LDKdWfG5B7Z_Vi-ur96",
    "Sem1": "152JBTnRN12u-DaiQ_rZ8I3dLr8-1N0UT",
    "Sem2": "17Z0ckBb-sIBG0IEyAymEr1FAVUw9DKLn",
    "Sem3": "1Nqm79FpYkJSktmxACiXcDbssRzuJTbYh",
    "Project": "1sUTnkdlWbe8MMuqrjTlpWhEYHzzdfXY8"
  }
};

function loadCourse(course) {
  const semestersDiv = document.querySelector('.semesters');
  const content = document.getElementById('content');
  semestersDiv.innerHTML = "";
  document.querySelectorAll('.course-card').forEach(card => card.classList.remove('active-course'));

  // Highlight selected card
  const selectedCard = [...document.querySelectorAll('.course-card')]
    .find(card => card.querySelector('h3').textContent === course);
  if (selectedCard) selectedCard.classList.add('active-course');

  // Build semester tabs
  const semesters = Object.keys(courseData[course]);
  semesters.forEach(sem => {
    const span = document.createElement('span');
    span.textContent = sem;
    span.onclick = () => loadSemester(course, sem);
    semestersDiv.appendChild(span);
  });

  if (semesters.length > 0) {
    loadSemester(course, semesters[0]);
  } else {
    content.innerHTML = `<p>No semesters available for ${course}.</p>`;
  }

  // Smooth scroll to content
  document.getElementById('courses').scrollIntoView({ behavior: 'smooth' });
}

function loadSemester(course, semester) {
  const folderId = courseData[course][semester];
  const content = document.getElementById('content');
  document.querySelectorAll('.semesters span').forEach(span => span.classList.remove('active'));

  const selectedSem = [...document.querySelectorAll('.semesters span')]
    .find(span => span.textContent === semester);
  if (selectedSem) selectedSem.classList.add('active');

  content.innerHTML = `
    <div class="semester-content">
      <h3>${course} - ${semester}</h3>
      <iframe src="https://drive.google.com/embeddedfolderview?id=${folderId}#list"></iframe>
    </div>
  `;
}

