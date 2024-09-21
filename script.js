document.getElementById('snapshotForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;

    fetch('/save-snapshot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadSnapshots();
    });
});

function loadSnapshots() {
    fetch('/snapshots')
        .then(response => response.json())
        .then(data => {
            const snapshotContainer = document.getElementById('snapshots');
            snapshotContainer.innerHTML = '';

            data.forEach(snapshot => {
                const snapshotDiv = document.createElement('div');
                // snapshotDiv.textContent = ${snapshot.name}: ${snapsho.description};
                snapshotDiv.textContent = `${snapshot.name}: ${snapshot.description}`;
                snapshotContainer.appendChild(snapshotDiv);
            });
        });
}

window.onload = loadSnapshots;

