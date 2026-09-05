import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function formatCurrency(amount = 0, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function drawRoundedBox(doc, x, y, width, height, options = {}) {
  const {
    fill = [255, 255, 255],
    border = [220, 228, 235],
    radius = 4,
  } = options;

  doc.setFillColor(...fill);
  doc.setDrawColor(...border);
  doc.setLineWidth(0.35);

  doc.roundedRect(
    x,
    y,
    width,
    height,
    radius,
    radius,
    "FD"
  );
}

function drawLabelValue(
  doc,
  label,
  value,
  x,
  y,
  width
) {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(label.toUpperCase(), x, y);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 42, 67);

  const wrapped = doc.splitTextToSize(
    String(value || "-"),
    width
  );

  doc.text(wrapped, x, y + 6);
}

export function generateInvoice(order) {
  if (!order) {
    throw new Error("Order information is missing.");
  }

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  const primary = [15, 42, 67];
  const teal = [8, 126, 139];
  const green = [22, 163, 74];
  const muted = [100, 116, 139];
  const lightBorder = [226, 232, 240];
  const lightBackground = [247, 250, 252];

  /*
   * ----------------------------------------------------
   * HEADER
   * ----------------------------------------------------
   */

  // Small anchor-style mark
  doc.setFillColor(...teal);
  doc.circle(margin + 7, 19, 6, "F");

  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.8);

  doc.line(margin + 7, 15.5, margin + 7, 22.5);
  doc.line(margin + 4.5, 18, margin + 9.5, 18);
  doc.line(margin + 5, 22, margin + 7, 24);
  doc.line(margin + 9, 22, margin + 7, 24);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(19);
  doc.setTextColor(...primary);
  doc.text("SHIPPEX", margin + 16, 21);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...muted);
  doc.text(
    "Marine supply platform",
    margin + 16,
    26
  );

  // Invoice heading
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...primary);

  doc.text(
    "SUPPLY INVOICE",
    pageWidth - margin,
    19,
    { align: "right" }
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...muted);

  doc.text(
    `Generated ${formatDateTime(new Date().toISOString())}`,
    pageWidth - margin,
    25,
    { align: "right" }
  );

  /*
   * ----------------------------------------------------
   * STATUS / ORDER NUMBER
   * ----------------------------------------------------
   */

  let y = 37;

  drawRoundedBox(
    doc,
    margin,
    y,
    contentWidth,
    27,
    {
      fill: lightBackground,
      border: lightBorder,
    }
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...muted);

  doc.text(
    "ORDER NUMBER",
    margin + 7,
    y + 8
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...primary);

  doc.text(
    order.orderNumber || "-",
    margin + 7,
    y + 16
  );

  // Status pill
  const status = order.status || "PLACED";

  const statusText = status.replaceAll("_", " ");

  doc.setFillColor(220, 252, 231);

  doc.roundedRect(
    pageWidth - margin - 32,
    y + 8,
    25,
    8,
    4,
    4,
    "F"
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...green);

  doc.text(
    statusText,
    pageWidth - margin - 19.5,
    y + 13,
    { align: "center" }
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...muted);

  doc.text(
    `Placed ${formatDate(order.createdAt)}`,
    pageWidth - margin - 7,
    y + 21,
    { align: "right" }
  );

  y += 35;

  /*
   * ----------------------------------------------------
   * DELIVERY DESTINATION
   * ----------------------------------------------------
   */

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...primary);

  doc.text(
    "Delivery Destination",
    margin,
    y
  );

  y += 6;

  const destinationHeight = 38;

  drawRoundedBox(
    doc,
    margin,
    y,
    contentWidth,
    destinationHeight,
    {
      fill: [255, 255, 255],
      border: lightBorder,
    }
  );

  const destination =
    order.deliveryDestination || {};

  const colWidth = contentWidth / 2;

  drawLabelValue(
    doc,
    "Ship Name",
    destination.shipName,
    margin + 7,
    y + 9,
    colWidth - 14
  );

  drawLabelValue(
    doc,
    "IMO Number",
    destination.imoNumber,
    margin + colWidth + 2,
    y + 9,
    colWidth - 9
  );

  drawLabelValue(
    doc,
    "Berth Number",
    destination.berthNumber,
    margin + 7,
    y + 26,
    colWidth - 14
  );

  drawLabelValue(
    doc,
    "Port Name",
    destination.portName,
    margin + colWidth + 2,
    y + 26,
    colWidth - 9
  );

  y += destinationHeight + 11;

  /*
   * ----------------------------------------------------
   * ORDER ITEMS
   * ----------------------------------------------------
   */

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...primary);

  doc.text(
    "Order Items",
    margin,
    y
  );

  y += 4;

  const items = order.items || [];

  const tableRows = items.map((item) => [
    item.name || "-",
    item.sku || "-",
    String(item.quantity || 0),
    formatCurrency(
      item.unitPrice || 0,
      order.currency || "USD"
    ),
    formatCurrency(
      item.subtotal || 0,
      order.currency || "USD"
    ),
  ]);

  autoTable(doc, {
    startY: y,
    margin: {
      left: margin,
      right: margin,
    },

    head: [
      [
        "Product",
        "SKU",
        "Qty",
        "Unit Price",
        "Amount",
      ],
    ],

    body: tableRows,

    theme: "plain",

    styles: {
      font: "helvetica",
      fontSize: 8.5,
      textColor: primary,
      cellPadding: 5,
      lineColor: lightBorder,
      lineWidth: 0.25,
    },

    headStyles: {
      fillColor: primary,
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 8,
    },

    alternateRowStyles: {
      fillColor: [249, 251, 253],
    },

    columnStyles: {
      0: {
        cellWidth: "auto",
      },
      1: {
        cellWidth: 22,
      },
      2: {
        cellWidth: 14,
        halign: "center",
      },
      3: {
        cellWidth: 27,
        halign: "right",
      },
      4: {
        cellWidth: 27,
        halign: "right",
        fontStyle: "bold",
      },
    },

    didDrawPage: () => {
      // Keep invoice styling consistent on additional pages.
    },
  });

  y = doc.lastAutoTable.finalY + 10;

  /*
   * ----------------------------------------------------
   * TOTALS
   * ----------------------------------------------------
   */

  const totalsWidth = 78;
  const totalsX =
    pageWidth - margin - totalsWidth;

  drawRoundedBox(
    doc,
    totalsX,
    y,
    totalsWidth,
    38,
    {
      fill: lightBackground,
      border: lightBorder,
    }
  );

  const currency = order.currency || "USD";

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...muted);

  doc.text(
    "Items Total",
    totalsX + 7,
    y + 9
  );

  doc.setFont("helvetica", "bold");
  doc.setTextColor(...primary);

  doc.text(
    formatCurrency(order.totalAmount || 0, currency),
    totalsX + totalsWidth - 7,
    y + 9,
    { align: "right" }
  );

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...muted);

  doc.text(
    "Delivery",
    totalsX + 7,
    y + 18
  );

  doc.setFont("helvetica", "bold");
  doc.setTextColor(...green);

  doc.text(
    "FREE",
    totalsX + totalsWidth - 7,
    y + 18,
    { align: "right" }
  );

  doc.setDrawColor(...lightBorder);
  doc.line(
    totalsX + 7,
    y + 23,
    totalsX + totalsWidth - 7,
    y + 23
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...primary);

  doc.text(
    "TOTAL",
    totalsX + 7,
    y + 32
  );

  doc.setFontSize(13);

  doc.text(
    formatCurrency(order.totalAmount || 0, currency),
    totalsX + totalsWidth - 7,
    y + 32,
    { align: "right" }
  );

  y += 49;

  /*
   * ----------------------------------------------------
   * DELIVERY INFORMATION
   * ----------------------------------------------------
   */

  if (
    y + 55 >
    pageHeight - 30
  ) {
    doc.addPage();
    y = 20;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...primary);

  doc.text(
    "Delivery Information",
    margin,
    y
  );

  y += 6;

  drawRoundedBox(
    doc,
    margin,
    y,
    contentWidth,
    42,
    {
      fill: [255, 255, 255],
      border: lightBorder,
    }
  );

  let deliveryDate = "-";
  let deliveryTime = "-";

  if (order.estimatedDeliveryDateTime) {
    const date =
      new Date(order.estimatedDeliveryDateTime);

    deliveryDate = formatDate(
      order.estimatedDeliveryDateTime
    );

    deliveryTime = date.toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  }

  drawLabelValue(
    doc,
    "Estimated Delivery",
    deliveryDate,
    margin + 7,
    y + 10,
    55
  );

  drawLabelValue(
    doc,
    "Delivery Time",
    deliveryTime,
    margin + 70,
    y + 10,
    45
  );

  drawLabelValue(
    doc,
    "Payment Method",
    (order.paymentMethod || "-")
      .replaceAll("_", " "),
    margin + 125,
    y + 10,
    55
  );

  drawLabelValue(
    doc,
    "Order Status",
    (order.status || "-")
      .replaceAll("_", " "),
    margin + 7,
    y + 28,
    55
  );

  drawLabelValue(
    doc,
    "Last Updated",
    formatDate(order.updatedAt),
    margin + 70,
    y + 28,
    55
  );

  y += 53;

  /*
   * ----------------------------------------------------
   * INSTRUCTIONS
   * ----------------------------------------------------
   */

  const hasInstructions =
    order.deliveryInstructions ||
    order.orderInstructions;

  if (hasInstructions) {
    if (y + 55 > pageHeight - 30) {
      doc.addPage();
      y = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...primary);

    doc.text(
      "Instructions",
      margin,
      y
    );

    y += 6;

    const instructionHeight = 42;

    drawRoundedBox(
      doc,
      margin,
      y,
      contentWidth,
      instructionHeight,
      {
        fill: lightBackground,
        border: lightBorder,
      }
    );

    if (order.deliveryInstructions) {
      drawLabelValue(
        doc,
        "Delivery Instructions",
        order.deliveryInstructions,
        margin + 7,
        y + 9,
        contentWidth / 2 - 14
      );
    }

    if (order.orderInstructions) {
      drawLabelValue(
        doc,
        "Order Instructions",
        order.orderInstructions,
        margin + contentWidth / 2 + 2,
        y + 9,
        contentWidth / 2 - 9
      );
    }

    y += instructionHeight + 10;
  }

  /*
   * ----------------------------------------------------
   * FOOTER
   * ----------------------------------------------------
   */

  const footerY = pageHeight - 15;

  doc.setDrawColor(...lightBorder);

  doc.line(
    margin,
    footerY - 5,
    pageWidth - margin,
    footerY - 5
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...primary);

  doc.text(
    "SHIPPEX",
    margin,
    footerY
  );

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...muted);

  doc.text(
    "Marine supplies delivered to your vessel.",
    margin + 19,
    footerY
  );

  doc.text(
    order.orderNumber || "",
    pageWidth - margin,
    footerY,
    { align: "right" }
  );

  /*
   * ----------------------------------------------------
   * SAVE
   * ----------------------------------------------------
   */

  const filename =
    `${order.orderNumber || "shippex-order"}-invoice.pdf`;

  doc.save(filename);
}