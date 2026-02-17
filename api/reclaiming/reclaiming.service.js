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

      const shiftOrder = ["A", "B", "C"];
      const startIdx = shiftOrder.indexOf(fromshift);
      const endIdx = shiftOrder.indexOf(toshift);

      if (startIdx === -1 || endIdx === -1)
        return callback(new Error("Invalid shift"));

      const startDate = new Date(fromdate);
      const endDate = new Date(todate);

      if (startDate.getTime() === endDate.getTime() && startIdx > endIdx)
        endDate.setDate(endDate.getDate() + 1);

      let matchCondition;

      if (startDate.getTime() === endDate.getTime()) {
        matchCondition = {
          date: startDate,
          shift: { $in: shiftOrder.slice(startIdx, endIdx + 1) },
        };
      } else {
        matchCondition = {
          $or: [
            { date: startDate, shift: { $in: shiftOrder.slice(startIdx) } },
            { date: endDate, shift: { $in: shiftOrder.slice(0, endIdx + 1) } },
            {
              date: { $gt: startDate, $lt: endDate },
              shift: { $in: shiftOrder },
            },
          ],
        };
      }

      const records = await Reclaiming.find(matchCondition).sort({
        date: 1,
        shift: 1,
      });

      if (!records.length) return callback(new Error("No data"));

      const norm = (n) => (n ? n.toString().trim().toUpperCase() : "");

      // ===== CPP1 dynamic =====
      let cpp1Set = new Set();
      records.forEach((doc) => {
        for (let i = 1; i <= 8; i++) {
          if (doc[`coal${i}name`]) cpp1Set.add(norm(doc[`coal${i}name`]));
          if (doc[`excoal${i}name`]) cpp1Set.add(norm(doc[`excoal${i}name`]));
        }
      });
      const cpp1Names = Array.from(cpp1Set).sort();

      // ===== CPP3 dynamic =====
      let cpp3Set = new Set();
      records.forEach((doc) => {
        for (let i = 1; i <= 6; i++) {
          if (doc[`cpp3coal${i}name`])
            cpp3Set.add(norm(doc[`cpp3coal${i}name`]));
        }
      });
      const cpp3Names = Array.from(cpp3Set).sort();

      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("RECLAIMING");

      // ===== PRINT SETTINGS (LANDSCAPE OFFICIAL) =====
      sheet.pageSetup = {
        paperSize: 9, // A4
        orientation: "landscape",
        fitToPage: true,
        fitToWidth: 1,
        fitToHeight: 1,
        horizontalCentered: true,
        verticalCentered: false,
        margins: {
          left: 0.3,
          right: 0.3,
          top: 0.5,
          bottom: 0.5,
          header: 0.2,
          footer: 0.2,
        },
      };

      sheet.views = [{ state: "frozen", xSplit: 2, ySplit: 3 }];

      // ===== TITLE =====
      const monthName = new Date(fromdate)
        .toLocaleString("default", { month: "long" })
        .toUpperCase();

      sheet.mergeCells("A1:Z1");
      const titleCell = sheet.getCell("A1");
      titleCell.value = `RECLAIMING SUMMARY ${monthName} MONTH`;
      titleCell.font = { bold: true, size: 16 };
      titleCell.alignment = { horizontal: "center", vertical: "middle" };

      // ===== HEADERS =====
      let headers = ["DATE", "SHIFT"];
      cpp1Names.forEach((c) => headers.push(c));

      headers.push("TOTAL", "Y-4", "Y-4A", "Y-127", "CPP1 TOTAL", "DAY TOTAL");
      headers.push("");
      cpp3Names.forEach((c) => headers.push(c));
      headers.push("CPP3 TOTAL", "PATH-A", "PATH-B", "CPP3 TOTAL", "DAY TOTAL");

      sheet.addRow([]);
      sheet.addRow(headers);

      const headerRow = sheet.getRow(3);

      // ===== HEADER STYLE (PERFECT ALIGNMENT) =====
      headerRow.eachCell((c) => {
        c.font = { bold: true, size: 11 };
        c.alignment = {
          horizontal: "center",
          vertical: "middle",
          wrapText: true,
        };

        c.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFE7E6E6" },
        };

        c.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "medium" },
          right: { style: "thin" },
        };
      });

      // ===== GROUP =====
      const grouped = {};
      records.forEach((r) => {
        const d = new Date(r.date).toISOString().split("T")[0];
        if (!grouped[d]) grouped[d] = [];
        grouped[d].push(r);
      });

      let rowIndex = 4;
      let grandCpp1 = 0;
      let grandCpp3 = 0;

      for (const date in grouped) {
        const rows = grouped[date];
        let startRow = rowIndex;
        let dayTotalCpp1 = 0;
        let dayTotalCpp3 = 0;

        for (const doc of rows) {
          let map = {};
          for (let i = 1; i <= 8; i++) {
            map[norm(doc[`coal${i}name`])] = doc[`coal${i}recl`] || 0;
            map[norm(doc[`excoal${i}name`])] = doc[`excoal${i}recl`] || 0;
          }

          let map3 = {};
          for (let i = 1; i <= 6; i++) {
            map3[norm(doc[`cpp3coal${i}name`])] = doc[`cpp3coal${i}recl`] || 0;
          }

          let cpp1Vals = cpp1Names.map((n) => map[n] || "");
          let cpp3Vals = cpp3Names.map((n) => map3[n] || "");

          const cpp1Total = doc.total_reclaiming || 0;
          const cpp3Total = doc.cpp3total_reclaiming || 0;

          dayTotalCpp1 += cpp1Total;
          dayTotalCpp3 += cpp3Total;
          grandCpp1 += cpp1Total;
          grandCpp3 += cpp3Total;

          let row = [
            date,
            doc.shift,
            ...cpp1Vals,
            cpp1Total,
            doc.cc50recl || "",
            doc.cc49recl || "",
            doc.cc126recl || "",
            cpp1Total,
            "",
            "",
            ...cpp3Vals,
            cpp3Total,
            doc.patharecl || "",
            doc.pathbrecl || "",
            cpp3Total,
            "",
          ];

          const newRow = sheet.addRow(row);

          // row borders like plant sheet
          newRow.eachCell((cell) => {
            cell.border = {
              top: { style: "hair" },
              left: { style: "hair" },
              bottom: { style: "hair" },
              right: { style: "hair" },
            };
            cell.alignment = { horizontal: "center", vertical: "middle" };
          });

          rowIndex++;
        }

        // merge date
        sheet.mergeCells(`A${startRow}:A${rowIndex - 1}`);
        sheet.getCell(`A${startRow}`).alignment = {
          vertical: "middle",
          horizontal: "center",
        };

        // ===== find day total columns =====
        let cpp1DayColIndex = null;
        let cpp3DayColIndex = null;
        let gapPassed = false;

        headerRow.eachCell((cell, colNumber) => {
          const val = cell.value;
          if (val === "" && !gapPassed) {
            gapPassed = true;
            return;
          }
          if (val === "DAY TOTAL" && !cpp1DayColIndex) {
            cpp1DayColIndex = colNumber;
            return;
          }
          if (val === "DAY TOTAL" && gapPassed) {
            cpp3DayColIndex = colNumber;
          }
        });

        if (cpp1DayColIndex) {
          const colLetter = sheet.getColumn(cpp1DayColIndex).letter;
          sheet.mergeCells(
            `${colLetter}${startRow}:${colLetter}${rowIndex - 1}`
          );
          const cell = sheet.getCell(`${colLetter}${startRow}`);
          cell.value = dayTotalCpp1 || "";
          cell.font = { bold: true };
          cell.alignment = { vertical: "middle", horizontal: "center" };
        }

        if (cpp3DayColIndex) {
          const colLetter3 = sheet.getColumn(cpp3DayColIndex).letter;
          sheet.mergeCells(
            `${colLetter3}${startRow}:${colLetter3}${rowIndex - 1}`
          );
          const cell3 = sheet.getCell(`${colLetter3}${startRow}`);
          cell3.value = dayTotalCpp3 || "";
          cell3.font = { bold: true };
          cell3.alignment = { vertical: "middle", horizontal: "center" };
        }
      }

      // ===== GRAND TOTAL ROW (DOUBLE BORDER OFFICIAL) =====
      const grandRow = sheet.addRow([]);
      const lastRowIndex = grandRow.number;

      sheet.getCell(`A${lastRowIndex}`).value = "GRAND TOTAL";
      sheet.getCell(`A${lastRowIndex}`).font = { bold: true };

      headerRow.eachCell((cell, col) => {
        const header = cell.value;

        if (header === "DAY TOTAL") {
          const colLetter = sheet.getColumn(col).letter;
          const gcell = sheet.getCell(`${colLetter}${lastRowIndex}`);

          if (!gcell.value) {
            if (!sheet.getCell(`${colLetter}${lastRowIndex}`).value)
              gcell.value = grandCpp1 || grandCpp3;
          }

          gcell.font = { bold: true };

          // double border
          gcell.border = {
            top: { style: "double" },
            bottom: { style: "double" },
            left: { style: "double" },
            right: { style: "double" },
          };
        }
      });

      // ===== AUTO COLUMN WIDTH =====
      sheet.columns.forEach((column) => {
        let max = 10;
        column.eachCell({ includeEmpty: true }, (cell) => {
          const val = cell.value ? cell.value.toString() : "";
          max = Math.max(max, val.length + 2);
        });
        column.width = max > 40 ? 40 : max;
      });

      // ===== SAVE FILE =====
      const dir = path.join(__dirname, "../excel");
      if (!fs.existsSync(dir)) fs.mkdirSync(dir);

      const formatDate = (d) => {
        const dt = new Date(d);
        return `${String(dt.getDate()).padStart(2, "0")}-${String(
          dt.getMonth() + 1
        ).padStart(2, "0")}-${dt.getFullYear()}`;
      };

      const fileName = `Reclaiming_${formatDate(
        fromdate
      )}_${fromshift}_to_${formatDate(todate)}_${toshift}.xlsx`;

      const filePath = path.join(dir, fileName);

      await workbook.xlsx.writeFile(filePath);
      return callback(null, filePath);
    } catch (err) {
      console.log(err);
      return callback(err);
    }
  },
};
