import React, { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search } from "lucide-react";

const SearchBar = ({ containers = [], onFilterChange, setSearchResult }) => {
  const [term, setTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [showResults, setShowResults] = useState(false);

  // Smooth Scroll + Highlight Slot
  const jumpToSlot = (containerId, slotId) => {
    const elementId = `rack-${containerId}-slot-${slotId}`;
    const el = document.getElementById(elementId);

    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.style.transition = "box-shadow 0.3s ease-in-out";
      el.style.boxShadow = "0 0 12px 4px skyblue";

      setTimeout(() => {
        el.style.boxShadow = "none";
      }, 1500);
    }
  };

  //  Search Matching Items
  const matches = useMemo(() => {
    const q = term.trim().toLowerCase();
    if (!q || q.length < 2) return [];

    const results = [];

    containers.forEach((container) => {
      container.slots.forEach((slot) => {
        if (!slot.items || slot.items.length === 0) return;

        slot.items.forEach((item) => {
          const name = item.itemName?.toLowerCase() || "";
          if (name.includes(q)) {
            results.push({
              containerId: container.id,          // matches UI structure
              containerName: container.rackName || container.name,
              slotId: slot.slotId,   
              slotNumber: slot.slotNumber,              // final correct reference
              slotName: slot.slotName,
              itemName: item.itemName,
              status: item.isReturnable ? "Returnable" : "Non-returnable",
            });
          }
        });
      });
    });

    return results;
  }, [term, containers]);

  const handleFilter = (value) => {
    setFilter(value);
    onFilterChange?.(value);
    setSearchResult?.(`Filter: ${value}`);
    setTimeout(() => setSearchResult?.(""), 1000);
  };

  const clear = () => {
    setTerm("");
    setShowResults(false);
    setSearchResult?.("");
  };

  const onResultClick = (containerId, slotId) => {
    jumpToSlot(containerId, slotId);
    setShowResults(false);
  };

  return (
    <div>
      {/* Search + Filter */}
      <div className="d-flex gap-2 align-items-center flex-wrap">
        <div style={{ flex: 1 }}>
          <input
            value={term}
            onChange={(e) => {
              setTerm(e.target.value);
              setShowResults(true);
            }}
            className="form-control"
            placeholder="Search items (min 2 letters)"
          />
        </div>

        <div style={{ minWidth: 180 }}>
          <select
            className="form-select"
            value={filter}
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option value="All">All</option>
            {/* <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option> */}
            <option value="Occupied">Occupied</option>
            <option value="Empty">Empty</option>
          </select>
        </div>

        <button className="btn btn-outline-secondary" onClick={clear}>
          Reset
        </button>
      </div>

      {/* Search Results */}
      {showResults && term.trim().length > 1 && (
        <div
          className="mt-2 p-2 rounded"
          style={{
            backgroundColor: "hsl(215, 25%, 14%)",
            border: "1px solid hsl(215, 20%, 25%)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
          }}
        >
          {matches.length === 0 ? (
            <div className="small text-muted px-2 py-1">No items found.</div>
          ) : (
            matches.map((m, idx) => (
              <button
                key={`${m.containerId}-${m.slotId}-${idx}`}
                type="button"
                className="w-100 text-start border-0 rounded mb-2 p-3"
                onClick={() => onResultClick(m.containerId, m.slotId)}
                style={{
                  backgroundColor: "hsl(215, 25%, 16%)",
                  color: "hsl(210, 40%, 98%)",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "hsl(215, 25%, 22%)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "hsl(215, 25%, 16%)")
                }
              >
                <div className="fw-semibold">{m.itemName}</div>
                <div className="small text-secondary">
                  • {m.containerName} • Slot {m.slotName} 
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
