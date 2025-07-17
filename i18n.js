

export const translations = {
  en: {
    // App
    language: 'Language',
    
    // Form Labels
    customerNameLabel: 'Customer Name',
    jewelryTypeLabel: 'Jewelry Type',
    materialLabel: 'Material',
    gramsVisibilityLabel: 'Grams in Customer Quotation',
    refImagesLabel: 'Reference Images (up to 5)',
    cadCostLabel: 'CAD Cost',
    mainStoneLabel: 'Main Stone',
    sideStoneLabel: 'Side Stone',
    laborCostLabel: 'Labor Cost (additional)',
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
    pricePerCaratPlaceholder: 'Price/ct.',

    // Buttons
    modeRemarks: 'Remarks',
    modeDetails: 'Details',
    modeDiameter: 'Diameter (Round)',
    addSideStoneBtn: '+ Add Side Stone Type',
    calculateBtn: 'Calculate Total Price',
    downloadShopPDF: 'Download PDF (Shop)',
    downloadCustomerPDF: 'Download PDF (Customer)',
    downloadFactoryPDF: 'For Factory',
    backBtn: '← Back',
    backBtnLabel: 'Back to calculator',
    saveBtn: 'Save',
    cancelBtn: 'Cancel',

    // Radio Buttons
    showGramsRadio: 'Show weight',
    hideGramsRadio: 'Hide weight',
    
    // Summary
    shopView: 'For Shop',
    customerView: 'For Customer',
    costBreakdown: 'Cost Breakdown',
    quotation: 'Quotation',
    materialPricePerGramLabel: 'Material Price (per gram)',
    totalMaterialCostLabel: 'Total Material Cost',
    lossLabel: '(+15% loss)',
    sideStonesCostLabel: 'Side Stones Cost',
    settingCostLabel: 'Setting Cost',
    subtotalLabel: 'Subtotal',
    marginAmountLabel: 'Margin ({marginPercentage}%)',
    totalShopLabel: 'Total Estimated Cost:',
    totalCustomerLabel: 'Total Estimated Price:',
    remarksForFactoryShopLabel: 'Remarks for Factory and Shop',
    remarksForCustomerLabel: 'Remarks for Customer',

    // Preferences Modal
    preferencesTitle: 'Preferences',
    materialPricesLabel: 'Material Prices (per gram)',
    settingCostsLabel: 'Setting Costs',
    mainStoneSettingCostLabel: 'Main Stone (per project)',
    sideStoneSettingCostLabel: 'Side Stone (per stone)',

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
    pdfMaterialPricePerGramLabel: 'Material Price (per gram)',
    pdfTotalMaterialCostLabel: 'Total Material Cost',
    pdfCadCostLabel: 'CAD Cost',
    pdfMainStoneCostLabel: 'Main Stone Cost',
    pdfSideStonesCostLabel: 'Side Stones Cost',
    pdfSettingCostLabel: 'Setting Cost',
    pdfLaborCostLabel: 'Labor Cost (additional)',
    pdfSubtotalLabel: 'Subtotal',
    pdfMarginLabel: 'Margin ({marginPercentage}%)',
    pdfTotalEstCostLabel: 'Total Estimated Cost:',
    pdfTotalEstPriceLabel: 'Estimated Price:',
    pdfRemarksLabel: 'Remarks:',
    shopPdfFilename: 'Quotation_Shop.pdf',
    customerPdfFilename: 'Quotation_Customer.pdf',
    factoryPdfFilename: 'WorkOrder.pdf',
    
    pdfTermsTitle: 'Terms and Conditions',
    pdfPriceValidityTitle: 'Price Validity',
    pdfPriceValidityText: 'This quotation is valid for 7 days from the date of issue.',
    pdfPaymentTermsTitle: 'Payment Terms',
    pdfPaymentTerm1: 'A 50% deposit of the total amount is required to confirm the production order.',
    pdfPaymentTerm2: 'The remaining 50% must be paid before delivery.',
    pdfPaymentMethodTitle: 'Payment Method',
    pdfPaymentMethodText: 'Account Name: Bogus Jewelry\nBank: K-Bank\nAccount No: 123-4-56789-0',
    pdfLeadTimeTitle: 'Production Lead Time',
    pdfLeadTimeText: 'Approximately 14-21 business days after receiving the deposit and design confirmation.',
    pdfCancellationTitle: 'Cancellation/Return Policy',
    pdfCancellationText: 'As this is a made-to-order item, it cannot be canceled, changed, or returned after production has been confirmed.',


    // Units
    gramsUnit: 'g',
    mmUnit: 'mm',

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
    shapeLabel: 'Shape',
    waitingForDetails: 'Waiting for diamond details...',
    carat: 'ct',
    color: 'Color',
    cut: 'Cut',
    clarity: 'Clarity',
    polish: 'Polish',
    diameterLabel: 'Diameter',
    pricePerCaratLabel: 'Price per Carat',
  },
  th: {
    // App
    language: 'ภาษา',
    
    // Form Labels
    customerNameLabel: 'ชื่อลูกค้า',
    jewelryTypeLabel: 'ประเภทเครื่องประดับ',
    materialLabel: 'วัสดุ',
    gramsVisibilityLabel: 'น้ำหนักในใบเสนอราคา',
    refImagesLabel: 'รูปภาพอ้างอิง (สูงสุด 5 รูป)',
    cadCostLabel: 'ค่าออกแบบ CAD',
    mainStoneLabel: 'Main stone',
    sideStoneLabel: 'เพชรบ่า',
    laborCostLabel: 'ค่าแรงอื่นๆ',
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
    pricePerCaratPlaceholder: 'ราคา/กะรัต',

    // Buttons
    modeRemarks: 'หมายเหตุ',
    modeDetails: 'รายละเอียด',
    modeDiameter: 'ขนาด (กลม)',
    addSideStoneBtn: '+ เพิ่มเพชรล้อม',
    calculateBtn: 'คำนวณราคาทั้งหมด',
    downloadShopPDF: 'ดาวน์โหลด PDF (ร้านค้า)',
    downloadCustomerPDF: 'ดาวน์โหลด PDF (ลูกค้า)',
    downloadFactoryPDF: 'สำหรับโรงงาน',
    backBtn: '← กลับ',
    backBtnLabel: 'กลับไปที่เครื่องคำนวณ',
    saveBtn: 'บันทึก',
    cancelBtn: 'ยกเลิก',

    // Radio Buttons
    showGramsRadio: 'แสดงน้ำหนัก',
    hideGramsRadio: 'ซ่อนน้ำหนัก',
    
    // Summary
    shopView: 'สำหรับร้านค้า',
    customerView: 'สำหรับลูกค้า',
    costBreakdown: 'รายละเอียดต้นทุน',
    quotation: 'ใบเสนอราคา',
    materialPricePerGramLabel: 'ราคาวัสดุ (ต่อกรัม)',
    totalMaterialCostLabel: 'ราคารวมวัสดุ',
    lossLabel: '(+15% ซิ)',
    sideStonesCostLabel: 'Side stones',
    settingCostLabel: 'ค่าฝัง',
    subtotalLabel: 'ยอดรวมย่อย',
    marginAmountLabel: 'กำไร ({marginPercentage}%)',
    totalShopLabel: 'ราคาสุทธิ:',
    totalCustomerLabel: 'ราคาประเมิน:',
    remarksForFactoryShopLabel: 'หมายเหตุสำหรับโรงงานและร้านค้า',
    remarksForCustomerLabel: 'หมายเหตุสำหรับลูกค้า',

    // Preferences Modal
    preferencesTitle: 'การตั้งค่า',
    materialPricesLabel: 'ราคาวัสดุ (ต่อกรัม)',
    settingCostsLabel: 'ค่าฝัง',
    mainStoneSettingCostLabel: 'เพชรยอด (ต่อโปรเจค)',
    sideStoneSettingCostLabel: 'เพชรบ่า (ต่อเม็ด)',
    
    // PDF
    shopPdfTitle: 'ใบเสนอราคา (สำหรับร้านค้า)',
    customerPdfTitle: 'ใบเสนอราคา',
    factoryPdfTitle: 'ใบสั่งผลิต',
    pdfDateLabel: 'วันที่: ',
    pdfForLabel: 'สำหรับ: ',
    pdfProjectCostTitle: 'รายละเอียดต้นทุนโครงการ',
    pdfProjectDetailsTitle: 'รายละเอียด',
    pdfRefImagesTitle: 'รูปภาพอ้างอิง',
    pdfRefImagesTitleCont: 'รูปภาพอ้างอิง',
    pdfJewelryTypeLabel: 'ประเภทเครื่องประดับ:',
    pdfMaterialLabel: 'วัสดุ:',
    pdfMainStoneLabel: 'Main stone:',
    pdfSideStoneLabel: 'Side stones:',
    pdfMaterialPricePerGramLabel: 'ราคาวัสดุ (ต่อกรัม)',
    pdfTotalMaterialCostLabel: 'ราคารวมวัสดุ',
    pdfCadCostLabel: 'ค่าออกแบบ CAD',
    pdfMainStoneCostLabel: 'ราคา Main stone',
    pdfSideStonesCostLabel: 'ราคา Side stone',
    pdfSettingCostLabel: 'ค่าฝัง',
    pdfLaborCostLabel: 'ค่าแรงอื่นๆ',
    pdfSubtotalLabel: 'ยอดรวมย่อย',
    pdfMarginLabel: 'กำไร ({marginPercentage}%)',
    pdfTotalEstCostLabel: 'ต้นทุนโดยประมาณ:',
    pdfTotalEstPriceLabel: 'ราคาประเมิน:',
    pdfRemarksLabel: 'หมายเหตุ:',
    shopPdfFilename: 'ใบเสนอราคา_ร้านค้า.pdf',
    customerPdfFilename: 'ใบเสนอราคา_ลูกค้า.pdf',
    factoryPdfFilename: 'ใบสั่งผลิต.pdf',
    
    pdfTermsTitle: 'เงื่อนไขและข้อตกลง',
    pdfPriceValidityTitle: 'การยืนราคา',
    pdfPriceValidityText: 'ใบเสนอราคามีอายุ 7 วัน นับจากวันที่ออกเอกสาร',
    pdfPaymentTermsTitle: 'เงื่อนไขการชำระเงิน',
    pdfPaymentTerm1: 'ชำระเงินมัดจำ 50% ของยอดรวมสุทธิ เพื่อยืนยันการสั่งผลิต',
    pdfPaymentTerm2: 'ชำระส่วนที่เหลืออีก 50% ก่อนการจัดส่งสินค้า',
    pdfPaymentMethodTitle: 'ช่องทางการชำระเงิน',
    pdfPaymentMethodText: 'ชื่อบัญชี: นาย ดลวัฒน์ แสนสุริวงค์\nธนาคาร: กสิกรไทย\nเลขที่บัญชี: 142-3-96854-7',
    pdfLeadTimeTitle: 'ระยะเวลาการผลิต',
    pdfLeadTimeText: 'ใช้ระยะเวลาในการผลิตประมาณ 14-21 วันทำการ หลังจากได้รับเงินมัดจำและยืนยันแบบการผลิตแล้ว',
    pdfCancellationTitle: 'นโยบายการยกเลิก/คืนสินค้า',
    pdfCancellationText: 'เนื่องจากเป็นสินค้าสั่งทำพิเศษ (Made-to-Order) จึงไม่สามารถยกเลิก, เปลี่ยนแปลง, หรือคืนสินค้าได้ หลังจากยืนยันการผลิตแล้ว',

    // Units
    gramsUnit: 'ก',
    mmUnit: 'มม.',
    
    // Jewelry Types
    ring: 'แหวน',
    bracelet: 'สร้อยข้อมือ/กำไลข้อมือ',
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
    shapeLabel: 'รูปทรง',
    waitingForDetails: 'รอรายละเอียดเพชร...',
    carat: 'กะรัต',
    color: 'สี',
    cut: 'เจียระไน',
    clarity: 'ความสะอาด',
    polish: 'การขัดเงา',
    diameterLabel: 'ขนาด',
    pricePerCaratLabel: 'ราคาต่อกะรัต',
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
