const API_BASE_URL = 'http://127.0.0.1:8000/api/';

// Pasiyentləri gətir
async function fetchPatients() {
    try {
        const response = await fetch(`${API_BASE_URL}patients/`);
        if (!response.ok) throw new Error('Şəbəkə cavabı yaxşı deyil');
        const data = await response.json();
        console.log('Pasiyentlər:', data);
        return data;
    } catch (error) {
        console.error('Pasiyent məlumatları xətası:', error);
        return [];
    }
}

// Diagnoz məlumatlarını gətir
async function fetchPatientDiagnosis(patientId) {
    try {
        const response = await fetch(`${API_BASE_URL}diagnosis/${patientId}/`);
        if (!response.ok) throw new Error('Diagnoz məlumatları alınmadı');
        const data = await response.json();
        console.log('Diagnozlar:', data);
        return data;
    } catch (error) {
        console.error('Diagnoz xətası:', error);
        return [];
    }
}

// Laboratoriya nəticələrini gətir
async function fetchPatientLabResults(patientId) {
    try {
        const response = await fetch(`${API_BASE_URL}lab-results/${patientId}/`);
        if (!response.ok) throw new Error('Laboratoriya nəticələri alınmadı');
        const data = await response.json();
        console.log('Lab nəticələri:', data);
        return data;
    } catch (error) {
        console.error('Lab xətası:', error);
        return [];
    }
}

// Sağlamlıq qeydlərini gətir
async function fetchPatientHealthRecords(patientId) {
    try {
        const response = await fetch(`${API_BASE_URL}health-records/${patientId}/`);
        if (!response.ok) throw new Error('Sağlamlıq qeydləri alınmadı');
        const data = await response.json();
        console.log('Sağlamlıq qeydləri:', data);
        return data;
    } catch (error) {
        console.error('Sağlamlıq qeydləri xətası:', error);
        return [];
    }
}

// Pasiyentləri göstər
function renderPatients(patients) {
    const people = document.querySelector('.people');
    people.innerHTML = '<span id="pp"><strong>Patients</strong><img src="{% static \'img/search_FILL0_wght300_GRAD0_opsz24.svg\' %}" alt=""></span>';
    
    patients.forEach((patient, i) => {
        people.innerHTML += ` 
            <div onclick="getPersonalInfo(${i}, ${patient.id})" class="person">
                <img src="${patient.profile_picture}" alt="">
                <div>
                    <h5>${patient.full_name}</h5>
                    <span>${patient.gender === 'F' ? 'Female' : 'Male'}, ${patient.age}</span>
                </div>
            </div>`;
    });
}

// Şəxsi məlumatları göstər
async function getPersonalInfo(index, patientId) {
    try {
        const patients = await fetchPatients();
        const patient = patients[index];
        
        // Bütün məlumatları paralel şəkildə gətir
        const [diagnosis, labResults, healthRecords] = await Promise.all([
            fetchPatientDiagnosis(patientId),
            fetchPatientLabResults(patientId),
            fetchPatientHealthRecords(patientId)
        ]);
        
        // Məlumatları göstər
        renderPersonalInfo(patient);
        renderDiagnosticList(diagnosis);
        renderLabResults(labResults);
        renderHealthRecords(healthRecords);
    } catch (error) {
        console.error('Şəxsi məlumatları gətirmə xətası:', error);
    }
}

// Şəxsi məlumatları render et
function renderPersonalInfo(patient) {
    const info = document.querySelector('.info');
    info.innerHTML = `
        <div class="profile">
            <img src="${patient.profile_picture}" alt="">
            <h5>${patient.full_name}</h5>
        </div>
        <div class="detail">
            <img src="{% static 'img/BirthIcon.png' %}" alt="">  
            <span>Date of Birth:</span> ${patient.date_of_birth}
        </div>
        <div class="detail">
            <img src="{% static 'img/FemaleIcon.svg' %}" alt="">  
            <span>Gender:</span> ${patient.gender === 'F' ? 'Female' : 'Male'}
        </div>
        <div class="detail">
            <img src="{% static 'img/PhoneIcon.svg'%}" alt="">  
            <span>Contact Info:</span> ${patient.contact_number}
        </div>
        <div class="detail">
            <img src="{% static 'img/PhoneIcon.svg' %}" alt="">  
            <span>Emergency Contacts:</span> ${patient.emergency_contact}
        </div>
        <div class="detail">
            <img src="{% static 'img/InsuranceIcon.svg' %}" alt="">  
            <span>Insurance Provider:</span> ${patient.insurance_provider}
        </div>
        <div class="detail">
            <button id="btn">Show all information</button>
        </div>
    `;
}

// Diagnoz siyahısını render et
function renderDiagnosticList(diagnosis) {
    const diagnosticListSection = document.getElementById("list");
    diagnosticListSection.innerHTML = `
        <div class="section-header">
            <h3>Diagnostic List</h3>
        </div>
        <div class="section-content">
            <table class="diagnostic-table">
                <thead>
                    <tr>
                        <th>Problem/Diagnosis</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${diagnosis.map(d => `
                        <tr>
                            <td>${d.name}</td>
                            <td>${d.description}</td>
                            <td><span class="status-badge ${d.status.toLowerCase()}">${d.status}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Laboratoriya nəticələrini render et
function renderLabResults(labResults) {
    const labResultContainer = document.querySelector(".lab-result-container");
    labResultContainer.innerHTML = labResults.map(result => `
        <div class="lab-result-card">
            <span class="lab-result-text">${result.result.split('/').pop()}</span>
            <a href="${result.result}" download>
                <img src="{% static '/img/download.png' %}" alt="Download">
            </a>
        </div>
    `).join('');
}

// Sağlamlıq qeydlərini və qrafiki render et
function renderHealthRecords(healthRecords) {
    if (!healthRecords || healthRecords.length === 0) {
        console.warn('Sağlamlıq qeydləri tapılmadı');
        return;
    }

    // Qrafik məlumatlarını hazırla
    const systolicData = healthRecords.map(r => r.systolic_value);
    const diastolicData = healthRecords.map(r => r.diastolic_value);
    const dates = healthRecords.map(r => `${r.month.slice(0,3)}, ${r.year}`);
    
    // Qrafiki yarat
    const ctx = document.getElementById("myChart").getContext("2d");
    
    if (window.myChartInstance) {
        window.myChartInstance.destroy();
    }
    
    window.myChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Systolic',
                    data: systolicData,
                    borderColor: '#D63384',
                    backgroundColor: '#D63384',
                    tension: 0.4,
                    pointRadius: 6,
                    pointBackgroundColor: '#D63384',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                },
                {
                    label: 'Diastolic',
                    data: diastolicData,
                    borderColor: '#6F42C1',
                    backgroundColor: '#6F42C1',
                    tension: 0.4,
                    pointRadius: 6,
                    pointBackgroundColor: '#6F42C1',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
    
    // Son sağlamlıq statistikalarını göstər
    const latestRecord = healthRecords[healthRecords.length - 1];
    document.querySelector('.health-stats').innerHTML = `
        <div class="stat-box">
            <h4>Respiratory Rate</h4>
            <p><strong>${latestRecord.respiratory_rate_value} bpm</strong></p>
            <span>${latestRecord.respiratory_rate_level}</span>
        </div>

        <div class="stat-box">
            <h4>Temperature</h4>
            <p><strong>${latestRecord.temperature_value}°F</strong></p>
            <span>${latestRecord.temperature_level}</span>
        </div>

        <div class="stat-box">
            <h4>Heart Rate</h4>
            <p><strong>${latestRecord.heart_rate_value} bpm</strong></p>
            <span>${latestRecord.heart_rate_level}</span>
        </div>
    `;
}

// Səhifə yüklənəndə işə düş
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const patients = await fetchPatients();
        if (patients.length === 0) {
            console.warn('Heç bir pasiyent tapılmadı');
            return;
        }
        renderPatients(patients);
        await getPersonalInfo(0, patients[0].id);
    } catch (error) {
        console.error('İlkin yükləmə xətası:', error);
    }
});