const totalTask = document.getElementById("total-task");
const tasks = document.getElementById("tasks");
const allOpenIssues = document.getElementById("openIssues");
const closedIssues = document.getElementById("closeIssues");
const allIssues = document.getElementById("allIssues");
const searchInput = document.getElementById("searchInput");

const searchBtn = document.getElementById("searchBtn");

async function dataFetching() {
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

  allIssuesTab(data.data);
}
function loadData(data) {
  data.forEach((issue) => {
    const div = document.createElement("div");

    const border = {
      open: "border-green-500",
      closed: "border-secondary",
    };

    const priorityStatus = {
      open: "./assets/Open-Status.png",
      closed: "./assets/Closed-Status.png",
    };
    const priorityImg = priorityStatus[issue.status.toLowerCase()];

    const borderClass =
      border[issue.status.toLowerCase()] || "border-yellow-500";

    const card = `                <div class="card bg-base-100 shadow-sm">
                    <div class="card-body border-t-4 ${borderClass} rounded-xl priority">
                        <div class="flex justify-between">
                            <div class="size-6 rounded-full"><img src="${priorityImg}" alt="" /> </div>
                            <div class="badge badge-soft  uppercase rounded-full priority">${issue.priority}
                            </div>
                        </div>
                        <h2 class="card-title">
                            ${issue.title}
                        </h2>
                        <p class="line-clamp-2">${issue.description}
                        </p>
                        <div class="card-actions">
                        ${issue.labels
                          .map((label) => {
                            const badgeColors = {
                              help: "badge-warning",
                              "good first issue": "badge-secondary",
                              bug: "badge-error",
                              documentation: "badge-info",
                              success: "badge-success",
                              enhancement: "badge-success",
                              "help wanted": "badge-warning",
                            };
                            const badgeIcon = {
                              help: "fa-life-ring",
                              "good first issue": "fa-thumbs-up",
                              bug: "fa-bug",
                              documentation: "fa-pen-to-square",
                              success: "badge-success",
                              enhancement: "fa-wand-sparkles",
                              "help wanted": "fa-life-ring",
                            };
                            const badgeClass =
                              badgeColors[label.toLowerCase()] ||
                              "badge-neutral";
                            const iconClass =
                              badgeIcon[label.toLowerCase()] || "fa-life-ring";
                            return `
                            <div class="badge badge-soft ${badgeClass} uppercase rounded-full">
                                <i class="fa-solid ${iconClass}"></i >${label}
                            </div>
                            `;
                          })
                          .join("")}

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
    allIssues.classList.remove("btn-primary", "btn-outline");
    closedIssues.classList.remove("btn-primary", "btn-outline");
    allOpenIssues.classList.remove("btn-outline");
    allOpenIssues.classList.add("btn-primary");

    tasks.innerHTML = "";
    loadData(openData);
  });
}
function closeIssues(closedData) {
  closedIssues.addEventListener("click", function () {
    allIssues.classList.remove("btn-primary", "btn-outline");
    allOpenIssues.classList.remove("btn-primary", "btn-outline");
    closedIssues.classList.remove("btn-outline");
    closedIssues.classList.add("btn-primary");

    tasks.innerHTML = "";
    loadData(closedData);
  });
}
function allIssuesTab(data) {
  allIssues.addEventListener("click", function () {
    allIssues.classList.remove("btn-primary", "btn-outline");
    allOpenIssues.classList.remove("btn-primary", "btn-outline");
    closedIssues.classList.remove("btn-primary", "btn-outline");
    allIssues.classList.add("btn-primary");

    tasks.innerHTML = "";
    loadData(data);
  });
}

function searchData() {
  searchBtn.addEventListener("click", async function () {
    const find = await fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchInput.value}`,
    );
    const data = await find.json();
    console.log(data);
    tasks.innerHTML = "";
    loadData(data.data);
  });
}
searchData();
dataFetching();

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
