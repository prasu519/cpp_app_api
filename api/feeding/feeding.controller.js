const ExcelJS = require("exceljs");
const {
  feedingService,
  feedingServiceRead,
  feedingServiceUpdate,
  feedingServiceDelete,
  feedingServiceReadDaywise,
  feedingServiceTotalFeeding,
  feedingServiceExcel,
} = require("./feeding.service");

module.exports = {
  feedingController: async (req, res) => {
    const body = req.body;
    feedingService(body, (error, results) => {
      if (error) {
        return res.status(500).json({
          success: 0,
          message: error,
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
    /* try {
      const body = req.body;
      const addFeeding = new Feeding(body);
      await addFeeding.save();
      res
        .status(200)
        .json({ message: "Posted Feeding successfully", feeding: addFeeding });
    } catch (error) {
      console.log("Error posting feeding data", error);
      res.status(500).json({ message: "Failed to post Fedding data" });
    }*/
  },

  feedingControllerRead: (req, res) => {
    const date = req.query.date;
    const shift = req.query.shift;

    feedingServiceRead(date, shift, (error, results) => {
      if (error) {
        return res.status(500).json({
          success: 0,
          message: error,
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  feedingControllerReadDaywise: (req, res) => {
    const date = req.query.date;

    feedingServiceReadDaywise(date, (error, results) => {
      if (error) {
        return res.status(500).json({
          success: 0,
          message: error,
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  feedingControllerUpdate: (req, res) => {
    const data = req.body;
    feedingServiceUpdate(data, (error, results) => {
      if (error) {
        return res.status(500).json({
          success: 0,
          message: error,
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  feedingControllerDelete: (req, res) => {
    const date = req.query.date;
    const shift = req.query.shift;
    feedingServiceDelete(date, shift, (error, results) => {
      if (error) {
        return res.status(500).json({
          success: 0,
          message: error,
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  feedingControllerTotalFeeding: (req, res) => {
    const fdate = req.query.fdate;
    const fshift = req.query.fshift;
    const tdate = req.query.tdate;
    const tshift = req.query.tshift;
    feedingServiceTotalFeeding(
      fdate,
      fshift,
      tdate,
      tshift,
      (error, results) => {
        if (error) {
          return res.status(500).json({
            success: 0,
            message: error,
          });
        }
        return res.status(200).json({
          success: 1,
          data: results,
        });
      }
    );
  },

  feedingControllerForPushingsExcel: (req, res) => {
    const fdate = req.query.fromdate;
    const fshift = req.query.fromshift;
    const tdate = req.query.todate;
    const tshift = req.query.toshift;
    //const { fdate, fshift, tdate, tshift } = req.query;

    feedingServiceExcel(
      fdate,
      fshift,
      tdate,
      tshift,
      async (error, results) => {
        if (error) {
          return res.status(500).json({
            success: 0,
            message: error,
          });
        }
        return res.status(200).json({
          success: 1,
          data: results,
        });
      }
    );
  },

  feedingControllerExcel: async (req, res) => {
    const { fdate, fshift, tdate, tshift } = req.query;

    feedingServiceExcel(
      fdate,
      fshift,
      tdate,
      tshift,
      async (error, results) => {
        if (error) {
          return res.status(500).json({ success: 0, message: error.message });
        }

        try {
          const ExcelJS = require("exceljs");

          const wb = new ExcelJS.Workbook();
          const ws = wb.addWorksheet("CPP DATA", {
            views: [{ state: "frozen", xSplit: 1, ySplit: 4 }],
          });

          ws.properties.defaultRowHeight = 22;

          // ===== TITLE =====
          const fromDate = new Date(fdate);
          const monthName = fromDate
            .toLocaleString("en-IN", { month: "long" })
            .toUpperCase();
          const year = fromDate.getFullYear();

          ws.mergeCells("B1:Y1");
          ws.getCell(
            "B1"
          ).value = `${monthName} MONTH COAL TOWER FEEDING DETAILS`;
          ws.getCell("B1").font = { name: "Calibri", size: 14, bold: true };
          ws.getCell("B1").alignment = { horizontal: "center" };

          // ===== HEADER =====
          ws.mergeCells("A2:A4");
          ws.mergeCells("B2:G2");
          ws.mergeCells("H2:M2");
          ws.mergeCells("N2:S2");
          ws.mergeCells("T2:Y2");

          ws.getCell("A2").value = "DATE";
          ws.getCell("B2").value = "A";
          ws.getCell("H2").value = "B";
          ws.getCell("N2").value = "C";
          ws.getCell("T2").value = "DAY WISE COAL TOWER FEEDING DETAILS";

          ws.getRow(4).values = [
            "",
            "CT-1",
            "CT-2",
            "CT-3",
            "PATH-E (CPP-1)",
            "PATH-C",
            "TOTAL",
            "CT-1",
            "CT-2",
            "CT-3",
            "PATH-E (CPP-1)",
            "PATH-C",
            "TOTAL",
            "CT-1",
            "CT-2",
            "CT-3",
            "PATH-E (CPP-1)",
            "PATH-C",
            "TOTAL",
            "CT-1",
            "CT-2",
            "CT-3",
            "TOTAL",
            "PATH-E",
            "PATH-C",
          ];

          // ===== HEADER STYLE =====
          [2, 3, 4].forEach((r) => {
            ws.getRow(r).eachCell((cell) => {
              cell.font = { name: "Calibri", size: 11, bold: true };
              cell.alignment = { horizontal: "center", vertical: "middle" };
              cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
              };
            });
          });

          // ===== SORT DATE =====
          results.sort((a, b) => new Date(a[0].date) - new Date(b[0].date));

          // ===== GRAND TOTAL OBJECT =====
          const GT = { A: {}, B: {}, C: {}, DAY: {} };

          ["A", "B", "C"].forEach((s) => {
            GT[s] = { ct1: 0, ct2: 0, ct3: 0, pathE: 0, pathc: 0, total: 0 };
          });
          GT.DAY = { ct1: 0, ct2: 0, ct3: 0, total: 0, pathE: 0, pathc: 0 };

          // ===== DATA ROWS =====
          results.forEach((day) => {
            const map = {};
            day.forEach((r) => (map[r.shift] = r));

            const A = map.A || {};
            const B = map.B || {};
            const C = map.C || {};

            const APE = (A.ct3 || 0) - (A.pathc || 0);
            const BPE = (B.ct3 || 0) - (B.pathc || 0);
            const CPE = (C.ct3 || 0) - (C.pathc || 0);

            const row = ws.addRow([
              day[0].date,
              A.ct1 || 0,
              A.ct2 || 0,
              A.ct3 || 0,
              APE,
              A.pathc || 0,
              A.total_feeding || 0,
              B.ct1 || 0,
              B.ct2 || 0,
              B.ct3 || 0,
              BPE,
              B.pathc || 0,
              B.total_feeding || 0,
              C.ct1 || 0,
              C.ct2 || 0,
              C.ct3 || 0,
              CPE,
              C.pathc || 0,
              C.total_feeding || 0,
              (A.ct1 || 0) + (B.ct1 || 0) + (C.ct1 || 0),
              (A.ct2 || 0) + (B.ct2 || 0) + (C.ct2 || 0),
              (A.ct3 || 0) + (B.ct3 || 0) + (C.ct3 || 0),
              (A.total_feeding || 0) +
                (B.total_feeding || 0) +
                (C.total_feeding || 0),
              APE + BPE + CPE,
              (A.pathc || 0) + (B.pathc || 0) + (C.pathc || 0),
            ]);

            row.eachCell((cell) => {
              cell.font = { name: "Calibri", size: 11 };
              cell.alignment = { horizontal: "center" };
              cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
              };
            });

            // ==== accumulate totals ====
            ["A", "B", "C"].forEach((s) => {
              const X = { A, B, C }[s];
              const PE = { A: APE, B: BPE, C: CPE }[s];
              GT[s].ct1 += X.ct1 || 0;
              GT[s].ct2 += X.ct2 || 0;
              GT[s].ct3 += X.ct3 || 0;
              GT[s].pathE += PE;
              GT[s].pathc += X.pathc || 0;
              GT[s].total += X.total_feeding || 0;
            });

            GT.DAY.ct1 += (A.ct1 || 0) + (B.ct1 || 0) + (C.ct1 || 0);
            GT.DAY.ct2 += (A.ct2 || 0) + (B.ct2 || 0) + (C.ct2 || 0);
            GT.DAY.ct3 += (A.ct3 || 0) + (B.ct3 || 0) + (C.ct3 || 0);
            GT.DAY.total +=
              (A.total_feeding || 0) +
              (B.total_feeding || 0) +
              (C.total_feeding || 0);
            GT.DAY.pathE += APE + BPE + CPE;
            GT.DAY.pathc += (A.pathc || 0) + (B.pathc || 0) + (C.pathc || 0);
          });

          // ===== GRAND TOTAL ROW =====
          const totalRow = ws.addRow([
            "TOTAL",
            GT.A.ct1,
            GT.A.ct2,
            GT.A.ct3,
            GT.A.pathE,
            GT.A.pathc,
            GT.A.total,
            GT.B.ct1,
            GT.B.ct2,
            GT.B.ct3,
            GT.B.pathE,
            GT.B.pathc,
            GT.B.total,
            GT.C.ct1,
            GT.C.ct2,
            GT.C.ct3,
            GT.C.pathE,
            GT.C.pathc,
            GT.C.total,
            GT.DAY.ct1,
            GT.DAY.ct2,
            GT.DAY.ct3,
            GT.DAY.total,
            GT.DAY.pathE,
            GT.DAY.pathc,
          ]);

          totalRow.eachCell((cell) => {
            cell.font = { name: "Calibri", size: 11, bold: true };
            cell.alignment = { horizontal: "center" };
            cell.border = {
              top: { style: "thick" },
              bottom: { style: "thick" },
              left: { style: "thin" },
              right: { style: "thin" },
            };
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "FFEFEFEF" },
            };
          });

          // ===== AUTO WIDTH =====
          ws.columns.forEach((col) => {
            col.width = 14;
          });

          // ===== SEND FILE =====
          res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          );

          res.setHeader(
            "Content-Disposition",
            `attachment; filename=CPP_FEEDING_${fdate}_TO_${tdate}.xlsx`
          );

          await wb.xlsx.write(res);
          res.end();
        } catch (err) {
          console.log(err);
          res.status(500).json({ success: 0, message: "Excel failed" });
        }
      }
    );
  },
};
