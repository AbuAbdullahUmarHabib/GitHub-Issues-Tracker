const allIssues = document.getElementById("all-issues");
const totalTask = document.getElementById("total-task");
const tasks = document.getElementById("tasks");
const allOpenIssues = document.getElementById("openIssues");
const closedIssues = document.getElementById("closeIssues");

async function allIssue() {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  loadData(data.data);
  const openData = data.data.filter(
    (issue) => issue.status.toLowerCase() === "open",
  );
  openIssues(openData);

  const closedData = data.data.filter(
    (issue) => issue.status.toLowerCase() === "closed",
  );
  closeIssues(closedData);
}
function loadData(data) {
  data.forEach((issue) => {
    const div = document.createElement("div");

    const card = `                <div class="card bg-base-100 shadow-sm">
                    <div class="card-body border-t-4 rounded-xl priority">
                        <div class="flex justify-between">
                            <div class="badge h-6 w-6 badge-soft badge-success rounded-full"><i
                                    class="fa-regular fa-circle-dot"></i> </div>
                            <div class="badge badge-soft  uppercase rounded-full priority">${issue.priority}
                            </div>
                        </div>
                        <h2 class="card-title">
                            ${issue.title}
                        </h2>
                        <p class="line-clamp-2">${issue.description}
                        </p>
                        <div class="card-actions">
                            <div class="badge badge-soft badge-error uppercase rounded-full"><i
                                    class="fa-solid fa-bug"></i>Error
                            </div>
                            <div class="badge badge-soft badge-warning uppercase rounded-full"><i
                                    class="fa-solid fa-life-ring"></i>help wanted
                            </div>
                        </div>
                        <div class="divider"></div>
                        <div class="flex flex-col gap-2">
                            <p class="text-xs text-neutral-500">${issue.author}</p>
                            <p class="text-xs text-neutral-500">${new Date(issue.createdAt).toLocaleDateString("en-US")}</p>
                        </div>

                    </div>
                </div>`;

    div.innerHTML = card;
    tasks.appendChild(div);
    totalTask.innerHTML = tasks.children.length;
  });

  const priorities = document.querySelectorAll(".priority");

  priorities.forEach((singlePriority) => {
    const priorityText = singlePriority.textContent.trim().toLowerCase();

    if (priorityText === "high") {
      singlePriority.classList.add("badge-error", "border-red-500");
    } else if (priorityText === "medium") {
      singlePriority.classList.add("badge-warning", "border-yellow-500");
    } else if (priorityText === "low") {
      singlePriority.classList.add("badge-base-300", "border-neutral-300");
    }
  });
}

function openIssues(openData) {
  allOpenIssues.addEventListener("click", function () {
    tasks.innerHTML = "";
    openData.forEach((issue) => {
      const div = document.createElement("div");

      const card = `                <div class="card bg-base-100 shadow-sm">
                    <div class="card-body border-t-4 rounded-xl priority">
                        <div class="flex justify-between">
                            <div class="badge h-6 w-6 badge-soft badge-success rounded-full"><i
                                    class="fa-regular fa-circle-dot"></i> </div>
                            <div class="badge badge-soft  uppercase rounded-full priority">${issue.priority}
                            </div>
                        </div>
                        <h2 class="card-title">
                            ${issue.title}
                        </h2>
                        <p class="line-clamp-2">${issue.description}
                        </p>
                        <div class="card-actions">
                            <div class="badge badge-soft badge-error uppercase rounded-full"><i
                                    class="fa-solid fa-bug"></i>Error
                            </div>
                            <div class="badge badge-soft badge-warning uppercase rounded-full"><i
                                    class="fa-solid fa-life-ring"></i>help wanted
                            </div>
                        </div>
                        <div class="divider"></div>
                        <div class="flex flex-col gap-2">
                            <p class="text-xs text-neutral-500">${issue.author}</p>
                            <p class="text-xs text-neutral-500">${new Date(issue.createdAt).toLocaleDateString("en-US")}</p>
                        </div>

                    </div>
                </div>`;

      div.innerHTML = card;
      tasks.appendChild(div);
      totalTask.innerHTML = tasks.children.length;
    });
  });
}
function closeIssues(closedData) {
  closedIssues.addEventListener("click", function () {
    tasks.innerHTML = "";
    closedData.forEach((issue) => {
      const div = document.createElement("div");

      const card = `                <div class="card bg-base-100 shadow-sm">
                    <div class="card-body border-t-4 rounded-xl priority">
                        <div class="flex justify-between">
                            <div class="badge h-6 w-6 badge-soft badge-success rounded-full"><i
                                    class="fa-regular fa-circle-dot"></i> </div>
                            <div class="badge badge-soft  uppercase rounded-full priority">${issue.priority}
                            </div>
                        </div>
                        <h2 class="card-title">
                            ${issue.title}
                        </h2>
                        <p class="line-clamp-2">${issue.description}
                        </p>
                        <div class="card-actions">
                            <div class="badge badge-soft badge-error uppercase rounded-full"><i
                                    class="fa-solid fa-bug"></i>Error
                            </div>
                            <div class="badge badge-soft badge-warning uppercase rounded-full"><i
                                    class="fa-solid fa-life-ring"></i>help wanted
                            </div>
                        </div>
                        <div class="divider"></div>
                        <div class="flex flex-col gap-2">
                            <p class="text-xs text-neutral-500">${issue.author}</p>
                            <p class="text-xs text-neutral-500">${new Date(issue.createdAt).toLocaleDateString("en-US")}</p>
                        </div>

                    </div>
                </div>`;

      div.innerHTML = card;
      tasks.appendChild(div);
      totalTask.innerHTML = tasks.children.length;
    });
  });
}

allIssue();

/* {
"id": 1,
"title": "Fix navigation menu on mobile devices",
"description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
"status": "open",
"labels": [
"bug",
"help wanted"
],
"priority": "high",
"author": "john_doe",
"assignee": "jane_smith",
"createdAt": "2024-01-15T10:30:00Z",
"updatedAt": "2024-01-15T10:30:00Z"
},
{
"id": 2,
"title": "Add dark mode support",
"description": "Users are requesting a dark mode option. This would improve accessibility and user experience.",
"status": "open",
"labels": [
"enhancement",
"good first issue"
],
"priority": "medium",
"author": "sarah_dev",
"assignee": "",
"createdAt": "2024-01-14T14:20:00Z",
"updatedAt": "2024-01-16T09:15:00Z"
},
*/
