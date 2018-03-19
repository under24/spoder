'use strict';

class CustomBlueprintGeneratorStateModule extends StateModule {
  
  makeCustomBlueprint() {
    return {
      1: [
        {
          coordType: "sagittalCursorY",
          startPct: 0,
          endPct: 100,
          pxlsToMove: this.coords[1].sagittalCursorY
        },
        {
          coordType: "transverseCursorX",
          startPct: 0,
          endPct: 100,
          pxlsToMove: this.coords[1].transverseCursorX - 185
        },
        {
          coordType: "transverseCursorY",
          startPct: 0,
          endPct: 100,
          pxlsToMove: this.coords[1].transverseCursorY + 235
        }
      ],
      2: [
        {
          coordType: "sagittalCursorX",
          startPct: 0,
          endPct: 100,
          pxlsToMove: this.coords[2].sagittalCursorX - 300
        },
        {
          coordType: "sagittalCursorY",
          startPct: 0,
          endPct: 100,
          pxlsToMove: this.coords[2].sagittalCursorY
        }
      ],
      3: [
        {
          coordType: "sagittalCursorX",
          startPct: 0,
          endPct: 100,
          pxlsToMove: this.coords[3].sagittalCursorX - 300
        },
        {
          coordType: "sagittalCursorY",
          startPct: 0,
          endPct: 100,
          pxlsToMove: this.coords[3].sagittalCursorY
        }
      ],
      4: [
        {
          coordType: "sagittalCursorX",
          startPct: 0,
          endPct: 100,
          pxlsToMove: this.coords[4].sagittalCursorX - 300
        },
        {
          coordType: "sagittalCursorY",
          startPct: 0,
          endPct: 100,
          pxlsToMove: this.coords[4].sagittalCursorY
        }
      ],
      5: [
        {
          coordType: "sagittalCursorX",
          startPct: 0,
          endPct: 100,
          pxlsToMove: this.coords[5].sagittalCursorX - 300
        },
        {
          coordType: "sagittalCursorY",
          startPct: 0,
          endPct: 100,
          pxlsToMove: this.coords[5].sagittalCursorY
        }
      ],
      6: [
        {
          coordType: "sagittalCursorX",
          startPct: 0,
          endPct: 100,
          pxlsToMove: this.coords[6].sagittalCursorX - 300
        },
        {
          coordType: "sagittalCursorY",
          startPct: 0,
          endPct: 100,
          pxlsToMove: this.coords[6].sagittalCursorY
        }
      ]
    };
  }
  
}
