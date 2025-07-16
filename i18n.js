export const translations = {
  en: {
    // App
    appTitle: 'Bogus order form',
    language: 'Language',
    
    // Form Labels
    customerNameLabel: 'Customer Name',
    jewelryTypeLabel: 'Jewelry Type',
    materialLabel: 'Material',
    showGramsLabel: 'Show grams in customer quotation',
    refImagesLabel: 'Reference Images (up to 5)',
    cadCostLabel: 'CAD Cost',
    mainStoneLabel: 'Main Stone',
    sideStoneLabel: 'Side Stone',
    laborCostLabel: 'Labor Cost',
    marginLabel: 'Margin (%)',
    
    // Placeholders
    customerNamePlaceholder: "Enter customer's name",
    gramsPlaceholder: "Grams (e.g., 5.5)",
    costPlaceholder: 'Enter cost',
    costPerStonePlaceholder: 'Cost Per Stone',
    qtyPlaceholder: 'Qty',
    remarksPlaceholder: 'Remarks (e.g., Blue Sapphire, 2ct)',
    weightPlaceholder: 'Weight (ct)',
    marginPlaceholder: 'e.g., 20',

    // Buttons
    toggleDetailsManual: 'Enter Remarks Manually',
    toggleDetailsDiamond: 'Add Diamond Details',
    addSideStoneBtn: '+ Add Side Stone Type',
    calculateBtn: 'Calculate Total Price',
    downloadShopPDF: 'Download PDF (Shop)',
    downloadCustomerPDF: 'Download PDF (Customer)',
    downloadFactoryPDF: 'For Factory',
    closeBtnLabel: 'Close',
    
    // Summary
    shopView: 'For Shop',
    customerView: 'For Customer',
    costBreakdown: 'Cost Breakdown',
    quotation: 'Quotation',
    materialCostLabel: 'Material Cost (+15%)',
    sideStonesCostLabel: 'Side Stones Cost',
    subtotalLabel: 'Subtotal',
    marginAmountLabel: 'Margin ({marginPercentage}%)',
    totalShopLabel: 'Total Estimated Cost:',
    totalCustomerLabel: 'Total Estimated Price:',
    remarksForFactoryShopLabel: 'Remarks for Factory and Shop',
    remarksForCustomerLabel: 'Remarks for Customer',

    // PDF
    shopPdfTitle: 'Quotation (For Shop)',
    customerPdfTitle: 'Quotation',
    factoryPdfTitle: 'Work Order',
    pdfDateLabel: 'Date: ',
    pdfForLabel: 'For: ',
    pdfProjectCostTitle: 'Project Cost Details',
    pdfProjectDetailsTitle: 'Project Details',
    pdfRefImagesTitle: 'Reference Images',
    pdfRefImagesTitleCont: 'Reference Images (cont.)',
    pdfJewelryTypeLabel: 'Jewelry Type:',
    pdfMaterialLabel: 'Material:',
    pdfMainStoneLabel: 'Main Stone:',
    pdfSideStoneLabel: 'Side Stones:',
    pdfMaterialCostPdfLabel: 'Material Cost (+15%)',
    pdfCadCostLabel: 'CAD Cost',
    pdfMainStoneCostLabel: 'Main Stone Cost',
    pdfSideStonesCostLabel: 'Side Stones Cost',
    pdfLaborCostLabel: 'Labor Cost',
    pdfSubtotalLabel: 'Subtotal',
    pdfMarginLabel: 'Margin ({marginPercentage}%)',
    pdfTotalEstCostLabel: 'Total Estimated Cost:',
    pdfTotalEstPriceLabel: 'Estimated Price:',
    pdfRemarksLabel: 'Remarks:',
    pdfNotesLabel: 'Notes:',
    pdfNote1: '- Price is an initial estimate and may change based on final design and market fluctuations.',
    pdfNote2: '- This quotation is valid for 30 days.',
    shopPdfFilename: 'Quotation_Shop.pdf',
    customerPdfFilename: 'Quotation_Customer.pdf',
    factoryPdfFilename: 'WorkOrder.pdf',


    // Units
    gramsUnit: 'g',

    // Jewelry Types
    ring: 'Ring',
    bracelet: 'Bracelet',
    necklace: 'Necklace',
    earring: 'Earring',
    pendant: 'Pendant',

    // Materials
    silver925: 'Silver 925',
    gold9k: 'Gold 9k',
    gold14k: 'Gold 14k',
    gold18k: 'Gold 18k',
    pt950: 'Platinum 950',

    // Diamond Shapes
    round: 'Round Cut',
    princess: 'Princess Cut',
    emerald: 'Emerald Cut',
    oval: 'Oval Cut',
    marquise: 'Marquise Cut',
    pear: 'Pear Cut',
    cushion: 'Cushion Cut',

    // Diamond Details (Cut, Clarity, Polish)
    EX: 'Excellent',
    VG: 'Very Good',

    // Stone remarks parts
    waitingForDetails: 'Waiting for diamond details...',
    carat: 'ct',
    color: 'Color',
    cut: 'Cut',
    clarity: 'Clarity',
    polish: 'Polish',
  },
  th: {
    // App
    appTitle: 'สร้างออเดอร์จิวเวลรี่',
    language: 'ภาษา',
    
    // Form Labels
    customerNameLabel: 'ชื่อลูกค้า',
    jewelryTypeLabel: 'ประเภทเครื่องประดับ',
    materialLabel: 'วัสดุ',
    showGramsLabel: 'แสดงน้ำหนัก (กรัม) ในใบเสนอราคาลูกค้า',
    refImagesLabel: 'รูปภาพอ้างอิง (สูงสุด 5 รูป)',
    cadCostLabel: 'ค่าออกแบบ CAD',
    mainStoneLabel: 'เพชรยอด',
    sideStoneLabel: 'เพชรบ่า',
    laborCostLabel: 'ค่าแรง',
    marginLabel: 'กำไร (%)',
    
    // Placeholders
    customerNamePlaceholder: 'กรอกชื่อลูกค้า',
    gramsPlaceholder: 'กรัม (เช่น 5.5)',
    costPlaceholder: 'กรอกราคา',
    costPerStonePlaceholder: 'ราคาต่อเม็ด',
    qtyPlaceholder: 'จำนวน',
    remarksPlaceholder: 'หมายเหตุ (เช่น ไพลิน, 2 กะรัต)',
    weightPlaceholder: 'น้ำหนัก (กะรัต)',
    marginPlaceholder: 'เช่น 20',

    // Buttons
    toggleDetailsManual: 'กรอกหมายเหตุเอง',
    toggleDetailsDiamond: 'เพิ่มรายละเอียดเพชร',
    addSideStoneBtn: '+ เพิ่มประเภทเพชรล้อม',
    calculateBtn: 'คำนวณราคาทั้งหมด',
    downloadShopPDF: 'ดาวน์โหลด PDF (ร้านค้า)',
    downloadCustomerPDF: 'ดาวน์โหลด PDF (ลูกค้า)',
    downloadFactoryPDF: 'สำหรับโรงงาน',
    closeBtnLabel: 'ปิด',
    
    // Summary
    shopView: 'สำหรับร้านค้า',
    customerView: 'สำหรับลูกค้า',
    costBreakdown: 'รายละเอียดต้นทุน',
    quotation: 'ใบเสนอราคา',
    materialCostLabel: 'ค่าวัสดุ (+15%)',
    sideStonesCostLabel: 'ค่าหินข้าง',
    subtotalLabel: 'ยอดรวมย่อย',
    marginAmountLabel: 'กำไร ({marginPercentage}%)',
    totalShopLabel: 'ต้นทุนโดยประมาณ:',
    totalCustomerLabel: 'ราคาประเมิน:',
    remarksForFactoryShopLabel: 'หมายเหตุสำหรับโรงงานและร้านค้า',
    remarksForCustomerLabel: 'หมายเหตุสำหรับลูกค้า',
    
    // PDF
    shopPdfTitle: 'ใบเสนอราคา (สำหรับร้านค้า)',
    customerPdfTitle: 'ใบเสนอราคา',
    factoryPdfTitle: 'ใบสั่งผลิต',
    pdfDateLabel: 'วันที่: ',
    pdfForLabel: 'สำหรับ: ',
    pdfProjectCostTitle: 'รายละเอียดต้นทุนโครงการ',
    pdfProjectDetailsTitle: 'รายละเอียดโครงการ',
    pdfRefImagesTitle: 'รูปภาพอ้างอิง',
    pdfRefImagesTitleCont: 'รูปภาพอ้างอิง (ต่อ)',
    pdfJewelryTypeLabel: 'ประเภทเครื่องประดับ:',
    pdfMaterialLabel: 'วัสดุ:',
    pdfMainStoneLabel: 'หินหลัก:',
    pdfSideStoneLabel: 'หินข้าง:',
    pdfMaterialCostPdfLabel: 'ค่าวัสดุ (+15%)',
    pdfCadCostLabel: 'ค่าออกแบบ CAD',
    pdfMainStoneCostLabel: 'ค่าหินหลัก',
    pdfSideStonesCostLabel: 'ค่าหินข้าง',
    pdfLaborCostLabel: 'ค่าแรง',
    pdfSubtotalLabel: 'ยอดรวมย่อย',
    pdfMarginLabel: 'กำไร ({marginPercentage}%)',
    pdfTotalEstCostLabel: 'ต้นทุนโดยประมาณ:',
    pdfTotalEstPriceLabel: 'ราคาประเมิน:',
    pdfRemarksLabel: 'หมายเหตุ:',
    pdfNotesLabel: 'หมายเหตุ:',
    pdfNote1: '- ราคาเป็นการประเมินเบื้องต้นและอาจมีการเปลี่ยนแปลงตามการออกแบบสุดท้ายและความผันผวนของตลาด',
    pdfNote2: '- ใบเสนอนี้มีอายุ 30 วัน',
    shopPdfFilename: 'ใบเสนอราคา_ร้านค้า.pdf',
    customerPdfFilename: 'ใบเสนอราคา_ลูกค้า.pdf',
    factoryPdfFilename: 'ใบสั่งผลิต.pdf',

    // Units
    gramsUnit: 'ก',
    
    // Jewelry Types
    ring: 'แหวน',
    bracelet: 'สร้อยข้อมือ',
    necklace: 'สร้อยคอ',
    earring: 'ต่างหู',
    pendant: 'จี้',

    // Materials
    silver925: 'เงิน 925',
    gold9k: 'ทอง 9k',
    gold14k: 'ทอง 14k',
    gold18k: 'ทอง 18k',
    pt950: 'แพลทินัม 950',
    
    // Diamond Shapes
    round: 'เพชรทรงกลม',
    princess: 'เพชรทรงปริ้นเซส',
    emerald: 'เพชรทรงเอมเมอรัลด์',
    oval: 'เพชรทรงไข่',
    marquise: 'เพชรทรงมาร์คีส์',
    pear: 'เพชรทรงหยดน้ำ',
    cushion: 'เพชรทรงคุชชั่น',
    
    // Diamond Details (Cut, Clarity, Polish)
    EX: 'EX',
    VG: 'VG',
    
    // Stone remarks parts
    waitingForDetails: 'รอรายละเอียดเพชร...',
    carat: 'กะรัต',
    color: 'สี',
    cut: 'เจียระไน',
    clarity: 'ความสะอาด',
    polish: 'การขัดเงา',
  }
};

export const t = (lang, key, replacements = {}) => {
  let translation = translations[lang]?.[key] || translations['en']?.[key] || key;
  Object.keys(replacements).forEach(rKey => {
      const regex = new RegExp(`{${rKey}}`, 'g');
      translation = translation.replace(regex, replacements[rKey]);
  });
  return translation;
};