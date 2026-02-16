const Reclaiming = require("../models/ReclaimingModel");
const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");

module.exports = {
  reclaimingService: async (data, callback) => {
    console.log(data);
    try {
      const addReclaiming = new Reclaiming(data);
      await addReclaiming.save();
      return callback(null, addReclaiming);
    } catch (error) {
      console.log(error);
      return callback(error);
    }
  },

  reclaimingServiceRead: async (date, shift, callback) => {
    try {
      const getReclaiming = await Reclaiming.find({ date: date, shift: shift });
      return callback(null, getReclaiming);
    } catch (error) {
      return callback(error);
    }
  },

  reclaimingServiceReadDaywise: async (date, callback) => {
    try {
      const getReclaimingdaywise = await Reclaiming.find({ date: date });
      return callback(null, getReclaimingdaywise);
    } catch (error) {
      return callback(error);
    }
  },

  reclaimingServiceUpdate: async (data, callBack) => {
    try {
      const updateReclaiming = await Reclaiming.updateOne(
        { date: data.date, shift: data.shift },
        {
          coal1recl: data.coal1recl,
          coal2recl: data.coal2recl,
          coal3recl: data.coal3recl,
          coal4recl: data.coal4recl,
          coal5recl: data.coal5recl,
          coal6recl: data.coal6recl,
          coal7recl: data.coal7recl,
          coal8recl: data.coal8recl,
          excoal1recl: data.excoal1recl,
          excoal2recl: data.excoal2recl,
          excoal3recl: data.excoal3recl,
          excoal4recl: data.excoal4recl,
          excoal5recl: data.excoal5recl,
          excoal6recl: data.excoal6recl,
          excoal7recl: data.excoal7recl,
          excoal8recl: data.excoal8recl,
          cpp3coal1name: data.cpp3coal1name,
          cpp3coal2name: data.cpp3coal2name,
          cpp3coal3name: data.cpp3coal3name,
          cpp3coal4name: data.cpp3coal4name,
          cpp3coal5name: data.cpp3coal5name,
          cpp3coal6name: data.cpp3coal6name,
          cpp3coal1recl: data.cpp3coal1recl,
          cpp3coal2recl: data.cpp3coal2recl,
          cpp3coal3recl: data.cpp3coal3recl,
          cpp3coal4recl: data.cpp3coal4recl,
          cpp3coal5recl: data.cpp3coal5recl,
          cpp3coal6recl: data.cpp3coal6recl,
          cc49recl: data.cc49recl,
          cc50recl: data.cc50recl,
          cc126recl: data.cc126recl,
          patharecl: data.patharecl,
          pathbrecl: data.pathbrecl,
          total_reclaiming: data.total_reclaiming,
          cpp3total_reclaiming: data.cpp3total_reclaiming,
        },
        { new: true }
      );
      return callBack(null, updateReclaiming);
    } catch (error) {
      return callBack(error);
    }
  },
  reclaimingServiceDelete: async (date, shift, callback) => {
    try {
      const deleted = await Reclaiming.deleteMany({
        date: date,
        shift: shift,
      });
      if (deleted.deletedCount === 0) {
        return callback(new Error("No report found to delete in reclaiming"));
      }
      return callback(null, deleted);
    } catch (error) {
      console.log(error);
      return callback(error);
    }
  },
  reclaimingServiceTotalRecl: async (
    fromdate,
    fromshift,
    todate,
    toshift,
    callback
  ) => {
    try {
      // ---------- validate shifts ----------
      const shiftOrder = ["A", "B", "C"];
      const startIdx = shiftOrder.indexOf(fromshift);
      const endIdx = shiftOrder.indexOf(toshift);
      if (startIdx === -1 || endIdx === -1) {
        return callback(new Error("Invalid shift. Use 'A', 'B' or 'C'."));
      }

      // ---------- normalize dates to midnight (day-only) ----------
      const startDate = new Date(fromdate);
      const endDate = new Date(todate);

      // If same date but fromShifS > toshift (wrap on next day), treat endDate as next day
      if (startDate.getTime() === endDate.getTime() && startIdx > endIdx) {
        endDate.setDate(endDate.getDate() + 1);
      }

      // ---------- build shift slices ----------
      const shiftsFromStart = shiftOrder.slice(startIdx); // from fromshift .. C
      const shiftsToEnd = shiftOrder.slice(0, endIdx + 1); // A .. toshift
      const allShifts = shiftOrder;

      // ---------- build matchCondition ----------
      let matchCondition;
      if (startDate.getTime() === endDate.getTime()) {
        // On same day and non-wrapping (startIdx <= endIdx): only shifts between fromshift..toshift
        if (startIdx > endIdx) {
          // This shouldn't happen because we handled same-day wrap above; still guard
          return callback(
            new Error(
              "Invalid range for same date. Use fromshift <= toshift or supply a later toDate."
            )
          );
        }
        matchCondition = {
          date: startDate,
          shift: { $in: shiftOrder.slice(startIdx, endIdx + 1) },
        };
      } else {
        // Different dates: three-part OR
        matchCondition = {
          $or: [
            // start date: from fromshift .. C
            { date: startDate, shift: { $in: shiftsFromStart } },

            // end date: A .. toshift
            { date: endDate, shift: { $in: shiftsToEnd } },

            // dates strictly between startDate and endDate -> all shifts
            {
              date: { $gt: startDate, $lt: endDate },
              shift: { $in: allShifts },
            },
          ],
        };
      }
      const pipeline = [
        { $match: matchCondition },
        {
          $group: {
            _id: null,
            totCC49Recl: { $sum: "$cc49recl" },
            totCC50Recl: { $sum: "$cc50recl" },
            totCC126Recl: { $sum: "$cc126recl" },
            totCpp1Recl: { $sum: "$total_reclaiming" },
            totCpp3Recl: { $sum: "$cpp3total_reclaiming" },
            totPathARecl: { $sum: "$patharecl" },
            totPathBRecl: { $sum: "$pathbrecl" },
          },
        },
      ];
      const result = await Reclaiming.aggregate(pipeline);
      //console.log(fromdate.todate);
      /* const totalRecl = await Reclaiming.aggregate([
        {
          $match: {
            date: { $gte: new Date(fromdate), $lte: new Date(todate) },
          },
        },
        {
          $group: {
            _id: null,
            totCC49Recl: { $sum: "$cc49recl" },
            totCC50Recl: { $sum: "$cc50recl" },
            totCC126Recl: { $sum: "$cc126recl" },
            totCpp1Recl: { $sum: "$total_reclaiming" },
            totCpp3Recl: { $sum: "$cpp3total_reclaiming" },
            totPathARecl: { $sum: "$patharecl" },
            totPathBRecl: { $sum: "$pathbrecl" },
          },
        },
      ]);*/
      if (!result.length) {
        return callback(
          new Error("No Total Reclaiming found for the given date range")
        );
      }
      const {
        totCC49Recl,
        totCC50Recl,
        totCC126Recl,
        totCpp1Recl,
        totCpp3Recl,
        totPathARecl,
        totPathBRecl,
      } = result[0];
      return callback(null, {
        totCC49Recl,
        totCC50Recl,
        totCC126Recl,
        totCpp1Recl,
        totCpp3Recl,
        totPathARecl,
        totPathBRecl,
      });
    } catch (error) {
      console.log(error);
      return callback(error);
    }
  },
  getTotalReclaimingByAllCoalNames: async (
    fromdate,
    fromshift,
    todate,
    toshift,
    callback
  ) => {
    try {
      // ---------- validate shifts ----------
      const shiftOrder = ["A", "B", "C"];
      const startIdx = shiftOrder.indexOf(fromshift);
      const endIdx = shiftOrder.indexOf(toshift);
      if (startIdx === -1 || endIdx === -1) {
        return callback(new Error("Invalid shift. Use 'A', 'B' or 'C'."));
      }

      // ---------- normalize dates to midnight (day-only) ----------
      const startDate = new Date(fromdate);
      const endDate = new Date(todate);

      // If same date but fromShifS > toshift (wrap on next day), treat endDate as next day
      if (startDate.getTime() === endDate.getTime() && startIdx > endIdx) {
        endDate.setDate(endDate.getDate() + 1);
      }

      // ---------- build shift slices ----------
      const shiftsFromStart = shiftOrder.slice(startIdx); // from fromshift .. C
      const shiftsToEnd = shiftOrder.slice(0, endIdx + 1); // A .. toshift
      const allShifts = shiftOrder;

      // ---------- build matchCondition ----------
      let matchCondition;
      if (startDate.getTime() === endDate.getTime()) {
        // On same day and non-wrapping (startIdx <= endIdx): only shifts between fromshift..toshift
        if (startIdx > endIdx) {
          // This shouldn't happen because we handled same-day wrap above; still guard
          return callback(
            new Error(
              "Invalid range for same date. Use fromshift <= toshift or supply a later toDate."
            )
          );
        }
        matchCondition = {
          date: startDate,
          shift: { $in: shiftOrder.slice(startIdx, endIdx + 1) },
        };
      } else {
        // Different dates: three-part OR
        matchCondition = {
          $or: [
            // start date: from fromshift .. C
            { date: startDate, shift: { $in: shiftsFromStart } },

            // end date: A .. toshift
            { date: endDate, shift: { $in: shiftsToEnd } },

            // dates strictly between startDate and endDate -> all shifts
            {
              date: { $gt: startDate, $lt: endDate },
              shift: { $in: allShifts },
            },
          ],
        };
      }
      const pipeline = [
        { $match: matchCondition },
        {
          $project: {
            coalEntries: {
              $concatArrays: [
                [
                  { name: "$coal1name", recl: "$coal1recl" },
                  { name: "$coal2name", recl: "$coal2recl" },
                  { name: "$coal3name", recl: "$coal3recl" },
                  { name: "$coal4name", recl: "$coal4recl" },
                  { name: "$coal5name", recl: "$coal5recl" },
                  { name: "$coal6name", recl: "$coal6recl" },
                  { name: "$coal7name", recl: "$coal7recl" },
                  { name: "$coal8name", recl: "$coal8recl" },

                  { name: "$excoal1name", recl: "$excoal1recl" },
                  { name: "$excoal2name", recl: "$excoal2recl" },
                  { name: "$excoal3name", recl: "$excoal3recl" },
                  { name: "$excoal4name", recl: "$excoal4recl" },
                  { name: "$excoal5name", recl: "$excoal5recl" },
                  { name: "$excoal6name", recl: "$excoal6recl" },
                  { name: "$excoal7name", recl: "$excoal7recl" },
                  { name: "$excoal8name", recl: "$excoal8recl" },
                ],
              ],
            },
          },
        },
        { $unwind: "$coalEntries" },
        {
          $match: {
            "coalEntries.name": { $nin: [null, ""] }, // remove null names and empty string
          },
        },
        {
          $group: {
            _id: "$coalEntries.name",
            totalRecl: { $sum: "$coalEntries.recl" },
          },
        },
        {
          $project: {
            _id: 0,
            coalName: "$_id",
            totalReclaiming: "$totalRecl",
          },
        },
      ];
      const totals = await Reclaiming.aggregate(pipeline);

      const result = {};
      totals.forEach(({ coalName, totalReclaiming }) => {
        result[coalName] = totalReclaiming;
      });

      return callback(null, result);
    } catch (error) {
      console.error("Aggregation error:", error);
      return callback(error);
    }
  },
  getTotalReclaimingByAllCoalNamesCpp3: async (
    fromdate,
    fromshift,
    todate,
    toshift,
    callback
  ) => {
    try {
      // ---------- validate shifts ----------
      const shiftOrder = ["A", "B", "C"];
      const startIdx = shiftOrder.indexOf(fromshift);
      const endIdx = shiftOrder.indexOf(toshift);
      if (startIdx === -1 || endIdx === -1) {
        return callback(new Error("Invalid shift. Use 'A', 'B' or 'C'."));
      }

      // ---------- normalize dates to midnight (day-only) ----------
      const startDate = new Date(fromdate);
      const endDate = new Date(todate);

      // If same date but fromShifS > toshift (wrap on next day), treat endDate as next day
      if (startDate.getTime() === endDate.getTime() && startIdx > endIdx) {
        endDate.setDate(endDate.getDate() + 1);
      }

      // ---------- build shift slices ----------
      const shiftsFromStart = shiftOrder.slice(startIdx); // from fromshift .. C
      const shiftsToEnd = shiftOrder.slice(0, endIdx + 1); // A .. toshift
      const allShifts = shiftOrder;

      // ---------- build matchCondition ----------
      let matchCondition;
      if (startDate.getTime() === endDate.getTime()) {
        // On same day and non-wrapping (startIdx <= endIdx): only shifts between fromshift..toshift
        if (startIdx > endIdx) {
          // This shouldn't happen because we handled same-day wrap above; still guard
          return callback(
            new Error(
              "Invalid range for same date. Use fromshift <= toshift or supply a later toDate."
            )
          );
        }
        matchCondition = {
          date: startDate,
          shift: { $in: shiftOrder.slice(startIdx, endIdx + 1) },
        };
      } else {
        // Different dates: three-part OR
        matchCondition = {
          $or: [
            // start date: from fromshift .. C
            { date: startDate, shift: { $in: shiftsFromStart } },

            // end date: A .. toshift
            { date: endDate, shift: { $in: shiftsToEnd } },

            // dates strictly between startDate and endDate -> all shifts
            {
              date: { $gt: startDate, $lt: endDate },
              shift: { $in: allShifts },
            },
          ],
        };
      }
      const pipeline = [
        { $match: matchCondition },
        {
          $project: {
            coalEntries: {
              $concatArrays: [
                [
                  { name: "$cpp3coal1name", recl: "$cpp3coal1recl" },
                  { name: "$cpp3coal2name", recl: "$cpp3coal2recl" },
                  { name: "$cpp3coal3name", recl: "$cpp3coal3recl" },
                  { name: "$cpp3coal4name", recl: "$cpp3coal4recl" },
                  { name: "$cpp3coal5name", recl: "$cpp3coal5recl" },
                  { name: "$cpp3coal6name", recl: "$cpp3coal6recl" },
                ],
              ],
            },
          },
        },
        { $unwind: "$coalEntries" },
        {
          $match: {
            "coalEntries.name": { $nin: [null, ""] }, // remove null names and empty string
          },
        },
        {
          $group: {
            _id: { $toUpper: "$coalEntries.name" }, // Normalize to UPPERCASE
            totalRecl: { $sum: "$coalEntries.recl" },
          },
        },
        {
          $project: {
            _id: 0,
            coalName: "$_id",
            totalReclaiming: "$totalRecl",
          },
        },
      ];
      const totals = await Reclaiming.aggregate(pipeline);

      const result = {};
      totals.forEach(({ coalName, totalReclaiming }) => {
        result[coalName] = totalReclaiming;
      });

      return callback(null, result);
    } catch (error) {
      console.error("Aggregation error:", error);
      return callback(error);
    }
  },

  reclaimingServiceExcel: async (
    fromdate,
    fromshift,
    todate,
    toshift,
    callback
  ) => {
    try {
      const ExcelJS = require("exceljs");
      const path = require("path");
      const fs = require("fs");

      // ===== SHIFT FILTER =====
      const shiftOrder = ["A", "B", "C"];
      const startIdx = shiftOrder.indexOf(fromshift);
      const endIdx = shiftOrder.indexOf(toshift);

      if (startIdx === -1 || endIdx === -1) {
        return callback(new Error("Invalid shift"));
      }

      const startDate = new Date(fromdate);
      const endDate = new Date(todate);

      if (startDate.getTime() === endDate.getTime() && startIdx > endIdx) {
        endDate.setDate(endDate.getDate() + 1);
      }

      const shiftsFromStart = shiftOrder.slice(startIdx);
      const shiftsToEnd = shiftOrder.slice(0, endIdx + 1);
      const allShifts = shiftOrder;

      let matchCondition;

      if (startDate.getTime() === endDate.getTime()) {
        matchCondition = {
          date: startDate,
          shift: { $in: shiftOrder.slice(startIdx, endIdx + 1) },
        };
      } else {
        matchCondition = {
          $or: [
            { date: startDate, shift: { $in: shiftsFromStart } },
            { date: endDate, shift: { $in: shiftsToEnd } },
            {
              date: { $gt: startDate, $lt: endDate },
              shift: { $in: allShifts },
            },
          ],
        };
      }

      const records = await Reclaiming.find(matchCondition).sort({
        date: 1,
        shift: 1,
      });

      if (!records.length) {
        return callback(new Error("No data found"));
      }

      const norm = (n) => (n ? n.toString().trim().toUpperCase() : "");

      // ===== CPP1 NAMES (ALPHABETICAL) =====
      let cpp1Set = new Set();
      records.forEach((doc) => {
        for (let i = 1; i <= 8; i++) {
          if (doc[`coal${i}name`]) cpp1Set.add(norm(doc[`coal${i}name`]));
          if (doc[`excoal${i}name`]) cpp1Set.add(norm(doc[`excoal${i}name`]));
        }
      });
      let cpp1Names = Array.from(cpp1Set).sort();

      // ===== CPP3 NAMES (ALPHABETICAL) =====
      let cpp3Set = new Set();
      records.forEach((doc) => {
        for (let i = 1; i <= 6; i++) {
          if (doc[`cpp3coal${i}name`])
            cpp3Set.add(norm(doc[`cpp3coal${i}name`]));
        }
      });
      let cpp3Names = Array.from(cpp3Set).sort();

      // ===== WORKBOOK =====
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("RECLAIMING");

      sheet.views = [
        {
          state: "frozen",
          xSplit: 1, // freeze column A
          ySplit: 3, // freeze first 3 rows
        },
      ];

      // ===== AUTO MONTH TITLE =====
      const monthName = new Date(fromdate)
        .toLocaleString("default", {
          month: "long",
        })
        .toUpperCase();

      sheet.mergeCells("A1:Z1");
      sheet.getCell("A1").value = `RECLAIMING SUMMARY ${monthName} MONTH`;
      sheet.getCell("A1").font = { bold: true, size: 16 };
      sheet.getCell("A1").alignment = { horizontal: "center" };

      // ===== HEADER =====
      let headers = ["DATE", "SHIFT"];
      cpp1Names.forEach((n) => headers.push(n));

      headers.push("TOTAL", "Y-4", "Y-4A", "Y-127", "CPP1 TOTAL", "DAY TOTAL");
      headers.push(""); // GAP
      cpp3Names.forEach((n) => headers.push(n));
      headers.push("CPP3 TOTAL", "PATH-A", "PATH-B", "CPP3 TOTAL", "DAY TOTAL");

      // ===== INSERT EMPTY ROW FOR SECTION TITLES =====
      sheet.addRow([]); // row2

      // ===== CALCULATE CPP1 + CPP3 POSITIONS =====
      const cpp1StartCol = 1; // column A
      const cpp1EndCol = 2 + cpp1Names.length + 5;
      // DATE+SHIFT + coal + total + y4 + y4a + y127 + cpp1total

      const gapCol = cpp1EndCol + 1;

      const cpp3StartCol = gapCol + 1;
      const cpp3EndCol = cpp3StartCol + cpp3Names.length + 4;
      // coal + total + pathA + pathB + total + daytotal

      // ===== CPP1 TITLE =====
      sheet.mergeCells(2, cpp1StartCol, 2, cpp1EndCol);
      sheet.getCell(2, cpp1StartCol).value = "CPP-1 RECLAIMING";
      sheet.getCell(2, cpp1StartCol).alignment = { horizontal: "center" };
      sheet.getCell(2, cpp1StartCol).font = { bold: true, size: 13 };

      // ===== CPP3 TITLE =====
      sheet.mergeCells(2, cpp3StartCol, 2, cpp3EndCol);
      sheet.getCell(2, cpp3StartCol).value = "CPP-3 RECLAIMING";
      sheet.getCell(2, cpp3StartCol).alignment = { horizontal: "center" };
      sheet.getCell(2, cpp3StartCol).font = { bold: true, size: 13 };

      sheet.addRow(headers);

      const headerRow = sheet.getRow(3);

      headerRow.eachCell((cell) => {
        cell.font = { bold: true, size: 12 };
        cell.alignment = { horizontal: "center", vertical: "middle" };
      });

      headerRow.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFD966" },
        };
      });

      // ===== GROUP BY DATE =====
      const grouped = {};
      records.forEach((r) => {
        const d = new Date(r.date).toISOString().split("T")[0];
        if (!grouped[d]) grouped[d] = [];
        grouped[d].push(r);
      });

      let rowIndex = 4;
      let grandCpp1 = 0;
      let grandCpp3 = 0;

      // coal totals
      let grandCpp1CoalTotals = new Array(cpp1Names.length).fill(0);
      let grandCpp3CoalTotals = new Array(cpp3Names.length).fill(0);

      // 🟢 NEW extra totals
      let grandY4 = 0;
      let grandY4A = 0;
      let grandY127 = 0;
      let grandPathA = 0;
      let grandPathB = 0;

      for (const date in grouped) {
        const rows = grouped[date];
        let startRow = rowIndex;

        for (let i = 0; i < rows.length; i++) {
          const doc = rows[i];

          let map = {};
          for (let c = 1; c <= 8; c++) {
            map[norm(doc[`coal${c}name`])] = doc[`coal${c}recl`] || 0;
            map[norm(doc[`excoal${c}name`])] = doc[`excoal${c}recl`] || 0;
          }

          let map3 = {};
          for (let c = 1; c <= 6; c++) {
            map3[norm(doc[`cpp3coal${c}name`])] = doc[`cpp3coal${c}recl`] || 0;
          }

          let cpp1Vals = [];
          cpp1Names.forEach((n, idx) => {
            const v = map[n] || 0;
            if (v) grandCpp1CoalTotals[idx] += v;
            cpp1Vals.push(v === 0 ? "" : v);
          });

          let cpp3Vals = [];
          cpp3Names.forEach((n, idx) => {
            const v = map3[n] || 0;
            if (v) grandCpp3CoalTotals[idx] += v;
            cpp3Vals.push(v === 0 ? "" : v);
          });

          const cpp1Total = doc.total_reclaiming || 0;
          const cpp3Total = doc.cpp3total_reclaiming || 0;

          grandCpp1 += cpp1Total;
          grandCpp3 += cpp3Total;

          // 🟢 accumulate Y totals
          grandY4 += doc.cc50recl || 0;
          grandY4A += doc.cc49recl || 0;
          grandY127 += doc.cc126recl || 0;

          // 🟢 path totals
          grandPathA += doc.patharecl || 0;
          grandPathB += doc.pathbrecl || 0;

          let row = [
            date,
            doc.shift,
            ...cpp1Vals,
            cpp1Total || "",
            doc.cc50recl || "",
            doc.cc49recl || "",
            doc.cc126recl || "",
            cpp1Total || "",
            cpp1Total || "",
            "",
            ...cpp3Vals,
            cpp3Total || "",
            doc.patharecl || "",
            doc.pathbrecl || "",
            cpp3Total || "",
            cpp3Total || "",
          ];

          sheet.addRow(row);
          rowIndex++;
        }

        sheet.mergeCells(`A${startRow}:A${rowIndex - 1}`);
        sheet.getCell(`A${startRow}`).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
      }

      // ===== GRAND TOTAL =====
      sheet.addRow([]);
      rowIndex++;

      let totalRow = ["", "GRAND TOTAL"];

      // CPP1 coal totals
      grandCpp1CoalTotals.forEach((v) => {
        totalRow.push(v || "");
      });

      // CPP1 totals
      totalRow.push(grandCpp1);
      totalRow.push(grandY4 || "");
      totalRow.push(grandY4A || "");
      totalRow.push(grandY127 || "");
      totalRow.push(grandCpp1);
      totalRow.push("");

      // GAP
      totalRow.push("");

      // CPP3 coal totals
      grandCpp3CoalTotals.forEach((v) => {
        totalRow.push(v || "");
      });

      // CPP3 totals
      totalRow.push(grandCpp3);
      totalRow.push(grandPathA || "");
      totalRow.push(grandPathB || "");
      totalRow.push(grandCpp3);
      totalRow.push("");

      for (let i = 0; i < cpp3Names.length; i++) totalRow.push("");
      totalRow.push(grandCpp3, "", "", grandCpp3, "");

      sheet.addRow(totalRow);

      const gtRow = sheet.getRow(sheet.lastRow.number);
      gtRow.font = { bold: true };

      // ===== BORDERS =====
      sheet.eachRow((row) => {
        row.eachCell((cell) => {
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
          cell.alignment = { horizontal: "center", vertical: "middle" };
        });
      });

      sheet.columns.forEach((col) => (col.width = 12));

      const dir = path.join(__dirname, "../excel");
      if (!fs.existsSync(dir)) fs.mkdirSync(dir);

      // ===== FORMAT DATE =====
      const formatDate = (d) => {
        const dt = new Date(d);
        const day = String(dt.getDate()).padStart(2, "0");
        const mon = String(dt.getMonth() + 1).padStart(2, "0");
        const yr = dt.getFullYear();
        return `${day}-${mon}-${yr}`;
      };

      const fdateFormatted = formatDate(fromdate);
      const tdateFormatted = formatDate(todate);

      // ===== FINAL FILE NAME =====
      const fileName = `Reclaiming_${fdateFormatted}_${fromshift}_to_${tdateFormatted}_${toshift}.xlsx`;

      const filePath = path.join(dir, fileName);

      await workbook.xlsx.writeFile(filePath);

      return callback(null, filePath);
    } catch (err) {
      console.log(err);
      return callback(err);
    }
  },
};
