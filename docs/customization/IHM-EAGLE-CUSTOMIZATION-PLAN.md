# I.H.M. Eagle Corp — Mission Control Customization Plan

**Repository:** `I-H-M-Eagle-Corp/openclaw-mission-control`  
**Forked From:** `abhi1693/openclaw-mission-control`  
**Date:** 2026-03-15  
**Status:** 🟡 **IN PROGRESS**

---

## 📋 ORIGINAL FEATURES (Inherited)

| Feature | Status | Notes |
|---------|--------|-------|
| Agent Management | ✅ | Create, inspect, manage agents |
| Task Orchestration | ✅ | Boards, tasks, tags |
| Gateway Integration | ✅ | OpenClaw Gateway connection |
| Approval Flows | ✅ | Built-in governance |
| Audit Trail | ✅ | Activity timeline |
| Multi-tenancy | ✅ | Organizations, board groups |
| Real-time Updates | ✅ | Live data sync |
| REST API | ✅ | Full API coverage |

**Tech Stack:**
- Frontend: Next.js 15 + React + TanStack Query + Radix UI + Clerk Auth
- Backend: FastAPI (Python) + PostgreSQL + Redis
- Deployment: Docker Compose

---

## 🔧 CUSTOMIZATIONS NEEDED

### Phase 1: Branding & Theming (Day 1)

| Task | File(s) | Description |
|------|---------|-------------|
| Logo Update | `frontend/public/logo.*` | Replace with Eagle Command logo |
| Color Scheme | `frontend/src/app/globals.css` | Change to amber/zinc theme |
| App Name | `frontend/src/config/site.ts` | "Eagle Command" |
| Favicon | `frontend/public/favicon.ico` | Custom favicon |
| Footer | `frontend/src/components/footer.tsx` | I.H.M. Eagle Corp branding |

### Phase 2: Feature Removal (Day 1-2)

| Feature | Action | Reason |
|---------|--------|--------|
| Multi-tenancy | Disable/Remove | Single org (I.H.M. Eagle Corp) |
| Complex Approvals | Simplify | Direct execution for Matt |
| External Auth | Replace | Use session key auth |
| Board Groups | Hide | Not needed for our use case |

### Phase 3: Custom Modules (Day 2-4)

#### Module A: Weather Widget
| Task | Backend | Frontend |
|------|---------|----------|
| wttr.in API integration | `backend/app/integrations/weather.py` | `frontend/src/components/weather-widget.tsx` |
| Inlet, NY location | Hardcoded config | Display widget |
| Auto-refresh | Cron job (15 min) | Real-time updates |

#### Module B: Calendar Integration
| Task | Backend | Frontend |
|------|---------|----------|
| iCloud CalDAV | `backend/app/integrations/calendar.py` | `frontend/src/components/calendar-widget.tsx` |
| Family Calendar | Use existing credentials | Event display |
| Sync | Every 30 min | Live updates |

#### Module C: Agent Status Panel (Enhanced)
| Task | Backend | Frontend |
|------|---------|----------|
| File watcher | `backend/app/watchers/agent_watcher.py` | `frontend/src/components/agent-status-panel.tsx` |
| Read `/workspace/coordination/agent-status/*.json` | File system watcher | Real-time grid |
| Heartbeat display | Parse timestamps | Last seen indicators |
| Task progress | Read active tasks | Progress bars |

#### Module D: Alert Center (Custom)
| Task | Backend | Frontend |
|------|---------|----------|
| PostgreSQL alerts table | `backend/app/models/alert.py` | `frontend/src/components/alert-center.tsx` |
| Integration with heartbeats | Trigger on events | Real-time notifications |
| Severity levels | Enum: critical/warning/info | Color-coded badges |
| Acknowledgment | API endpoint | Mark as read |

### Phase 4: Integration (Day 4-5)

| Integration | Source | Destination |
|-------------|--------|-------------|
| Agent Status | `/workspace/coordination/agent-status/*.json` | Dashboard real-time |
| Weather | wttr.in API | Dashboard widget |
| Calendar | iCloud CalDAV | Dashboard widget |
| Tasks | `/workspace/coordination/tasks/` | Task board |
| Alerts | PostgreSQL + heartbeats | Alert center |

---

## 🗂️ FILE STRUCTURE (Customized)

```
openclaw-mission-control/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx              # Dashboard (customized)
│   │   │   └── layout.tsx            # Root layout (branded)
│   │   ├── components/
│   │   │   ├── agent-status-panel.tsx    # CUSTOM
│   │   │   ├── weather-widget.tsx        # CUSTOM
│   │   │   ├── calendar-widget.tsx       # CUSTOM
│   │   │   ├── alert-center.tsx          # CUSTOM
│   │   │   └── mission-brief-panel.tsx   # CUSTOM (combines above)
│   │   ├── hooks/
│   │   │   ├── useAgentStatus.ts         # CUSTOM
│   │   │   ├── useWeather.ts             # CUSTOM
│   │   │   ├── useCalendar.ts            # CUSTOM
│   │   │   └── useAlerts.ts              # CUSTOM
│   │   └── config/
│   │       └── site.ts               # Eagle Command branding
│   └── public/
│       ├── logo.png                  # CUSTOM
│       └── favicon.ico                 # CUSTOM
├── backend/
│   └── app/
│       ├── integrations/
│       │   ├── weather.py              # CUSTOM
│       │   └── calendar.py             # CUSTOM
│       ├── watchers/
│       │   └── agent_watcher.py        # CUSTOM
│       └── models/
│           └── alert.py                # CUSTOM (enhanced)
├── docs/
│   └── customization/
│       └── this file
└── compose.yml                         # May need adjustments
```

---

## 🚀 DEPLOYMENT

### Option A: Replace Current Dashboard
```bash
# Stop current container
ssh root@38.77.7.12 "docker stop eagle-dashboard"

# Deploy Mission Control
docker compose up -d
```

### Option B: Run Parallel (Recommended for Testing)
```bash
# Deploy on different port/subdomain
docker compose -f compose.yml -f compose.override.yml up -d

# Access at: https://mission-control.eagle-wireless.net
```

---

## 📊 TIMELINE

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| Phase 1: Branding | Day 1 | Themed dashboard |
| Phase 2: Feature Removal | Day 1-2 | Simplified UI |
| Phase 3: Custom Modules | Day 2-4 | Weather, Calendar, Agent Status, Alerts |
| Phase 4: Integration | Day 4-5 | Live data connected |
| Testing & Deploy | Day 5 | Production ready |

**Total ETA:** 5 days (vs 4-5 days from scratch)

**Advantage:** Inherited robust agent/task management system

---

## ✅ NEXT STEPS

1. **Start Phase 1** — Branding customization
2. **Assign to:** Morpheus (frontend) + NEO (backend/infrastructure)
3. **Test deployment** on staging subdomain
4. **Migrate** from current static dashboard

---

**Owner:** Jarvis (COO AI)  
**Developers:** Morpheus + NEO  
**Stakeholder:** Matt Miller
