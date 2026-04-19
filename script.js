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

let userSignedIn = false;
let signedInEmail = null;
let tokenClient = null;
let gapiInitialized = false;

function initializeGapiClient() {
    gapi.load('client', async () => {
        try {
            await gapi.client.init({
                apiKey: "AIzaSyCvTLuCmTsDTN4yKXDcYqlnoDu_bjWfr9A",
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
            });
            gapiInitialized = true;
            console.log("GAPI client initialized");
        } catch (error) {
            console.error("Error initializing GAPI:", error);
        }
    });
}

function handleCredentialResponse(response) {
    // The response.credential is a JWT (JSON Web Token)
    const responsePayload = decodeJwtResponse(response.credential);
	userSignedIn = true;
	signedInEmail = responsePayload.email;

    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);

    // Update UI
    document.getElementById('buttonDiv').style.display = 'none';
    document.getElementById('user-info').style.display = 'block';
    document.getElementById('user-name').innerText = responsePayload.name;
    document.getElementById('user-pic').src = responsePayload.picture;

  	// Request token after sign-in
  	if (tokenClient) {
    	tokenClient.requestAccessToken();
  	}
}

// Simple function to decode the JWT token from Google
function decodeJwtResponse(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "160729259266-ed2isrqtng3799re2p9vpah3rosar6e3.apps.googleusercontent.com",
        callback: handleCredentialResponse,
		auto_select: true
    });

    // Renders the standard Google Sign-In button
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // Customization attributes
    );

	// Initialize Drive API client
    gapi.load("client", async() => {
    	await gapi.client.init({
            apiKey: "AIzaSyCvTLuCmTsDTN4yKXDcYqlnoDu_bjWfr9A",
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
        });
        console.log("Drive API client loaded");
		tokenClient = google.accounts.oauth2.initTokenClient({
    		client_id: "160729259266-ed2isrqtng3799re2p9vpah3rosar6e3.apps.googleusercontent.com",
    		scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
    		callback: async (tokenResponse) => {
        		if (tokenResponse.error !== undefined) {
            		console.error("Token Error:", tokenResponse.error);
            		throw tokenResponse;
        		}
				// 1. Set the token
        		gapi.client.setToken({ access_token: tokenResponse.access_token });
        		console.log("Access token set.");
        		// 2. Safety Check: Wait for GAPI initialization if it's slow
        		if (!gapiInitialized) {
            		console.warn("GAPI not ready, waiting...");
            		await new Promise(resolve => {
                		const interval = setInterval(() => {
                    		if (gapiInitialized) {
                        		clearInterval(interval);
                        		resolve();
                    		}
                		}, 100);
            		});
        		}
				// 3. Safety Check: Ensure Email is captured
        		if (signedInEmail) {
            		console.log("Calling setUserRole for:", signedInEmail);
            		await setUserRole(signedInEmail);
        		} else {
            		// Attempt to get email from the JWT if signedInEmail is lost
            		console.error("signedInEmail is missing. Ensure handleCredentialResponse runs first.");
        		}
    		}
		});
  	});
};

async function setUserRole(userEmail) {
  const topFolderId = "13ifRtDs6cr7SrLSg16MNBv7-mlGqa3N6";
  const courseFolderIds = {
    "1sz62MIYhKBN4Dqzc3qpaSlHMZpvhochY": "MA_Economics",
    "1NRzrClmJo2-KNOz1FNo86A5F_1AyVnu2": "MA_English",
    "1ttN_PEksK7UFIGdWCmjrfGrpIjHwx2j7": "MA_Mathematics",
    "1D5avoZ3v6tRfnS7FqGyocFf16O7P0koe": "MA_Political_Science",
    "1hjh3nBu9ondUt9pwZatlu1i1DcrcjXJl": "MBA",
    "1Rg6l_WJ6DzFfthoa16VMVRxB8orKxtwD": "MCA"
  };

  async function hasWriteAccess(folderId) {
  	try {
    	const response = await gapi.client.drive.permissions.list({
      	fileId: folderId,
      	supportsAllDrives: true,
      	fields: "permissions(emailAddress,role)"
    	});
    	const perms = response.result.permissions || [];
            // Check if user's email is explicitly listed with write permissions
            const userPerm = perms.find(p => p.emailAddress?.toLowerCase() === userEmail.toLowerCase());
            return userPerm && ["writer", "owner", "organizer", "fileOrganizer"].includes(userPerm.role);
        } catch (err) {
            console.error("Access check failed for " + folderId, err);
            return false;
        }
    }

  let role = "Student";
  let adminFolders = [];

  // Super Admin check
  if (await hasWriteAccess(topFolderId)) {
    role = "Super Admin";
  } else {
    // Collect all course folders with write access
    for (const [folderId, name] of Object.entries(courseFolderIds)) {
      if (await hasWriteAccess(folderId)) {
        adminFolders.push(name);
      }
    }

    if (adminFolders.length >= 2) {
      role = adminFolders.join("|") + " admin";
    } else if (adminFolders.length === 1) {
      role = adminFolders[0] + " admin";
    }
  }

  // Update the UI
    const displayElement = document.getElementById("role-display");
    if (displayElement) {
        displayElement.innerText = role;
    }
 }

function signOut() {
	userSignedIn = false;
    google.accounts.id.disableAutoSelect();
    location.reload(); // Simple way to reset state for this demo
}
function loadCourse(course) {
  if (!userSignedIn) {
    alert("Please sign in with Google to access course materials.");
    document.querySelector(".g_id_signin").scrollIntoView({ behavior: 'smooth' });
    return;
  }
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
