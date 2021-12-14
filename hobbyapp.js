"use strict"

const getOutput = document.querySelector("#getOutput");

// CREATE WORKOUT 

document.querySelector("#workoutForm").addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("THIS:", this);
    const form = this;
    console.log("WEIGHT :", form.weight);

    // const formcol = document.createElement("div");
    // form.classList.add("add")
    // const formCard = document.createElement("div");
    // formCard.classList.add("card");
    // const formBody = document.createElement("div");
    // formBody.classList.add("card-body");

        const data = {
        workoutName: form.workoutName.value,
        bodyPart: form.bodyPart.value,
        targetMuscle: form.targetMuscle.value,
        weight: form.weight.value,
        reps: form.reps.value,
        sets: form.sets.value
    };

    console.log("DATA: ", data);

    axios
        .post("http://localhost:8080/create", data)
        .then(res => {
            getWorkouts();
            form.reset();
            form.workoutName.focus();
            console.log(res);
        })
        .catch(err => console.error(err));
});


// GET ALL WORKOUTS
const getWorkouts = () => {
    axios
        .get("http://localhost:8080/getAll")
        .then(res => {
            console.log(res);
            const workouts = res.data;
            getOutput.innerHTML = "";

            for (let workout of workouts) {
                // console.log(workout);
                const workoutCol = document.createElement("div");
                workoutCol.classList.add("col");
                const workoutCard = document.createElement("div");
                workoutCard.classList.add("card");
                const workoutBody = document.createElement("div");
                workoutBody.classList.add("card-body");

                // const workoutId = document.createElement("h5");
                // workoutId.classList.add("card-title");
                // workoutId.innerText = `ID ${workout.id} -`;
                // workoutBody.appendChild(workoutId);

                const workoutName = document.createElement("h5");
                workoutName.classList.add("card-title");
                workoutName.innerText = ` ${workout.workoutName}`;
                workoutBody.appendChild(workoutName);

                const bodyPart = document.createElement("p");
                bodyPart.classList.add("card-text");
                bodyPart.innerText = `Body Part: ${workout.bodyPart}`;
                workoutBody.appendChild(bodyPart);

                const targetMuscle = document.createElement("p");
                targetMuscle.classList.add("card-text");
                targetMuscle.innerText = `Target Muscle: ${workout.targetMuscle}`;
                workoutBody.appendChild(targetMuscle);

                const weight = document.createElement("p");
                weight.classList.add("card-text");
                weight.innerText = `Weight: ${workout.weight}kg`;
                workoutBody.appendChild(weight);

                const reps = document.createElement("p");
                reps.classList.add("card-text");
                reps.innerText = `Reps: ${workout.reps}`;
                workoutBody.appendChild(reps);

                const sets = document.createElement("p");
                sets.classList.add("card-text");
                sets.innerText = `Sets: ${workout.sets}`;
                workoutBody.appendChild(sets);

                const workoutDelete = document.createElement("button");
                workoutDelete.innerText = "REMOVE WORKOUT";
                workoutDelete.classList.add("btn", "btn-danger");
                workoutDelete.addEventListener("click", () => {
                    axios
                        .delete(`http://localhost:8080/remove/${workout.id}`)
                        .then(res => getWorkouts())
                        .catch(err => console.error(err))
                })

                workoutBody.appendChild(workoutDelete);
                workoutCard.appendChild(workoutBody);
                workoutCol.appendChild(workoutCard);
                getOutput.appendChild(workoutCol);

            }

        })
        .catch(err => console.error(err))
}
getWorkouts();


