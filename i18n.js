

export const translations = {
  en: {
    // App
    language: 'Language',
    
    // Form Labels
    customerNameLabel: 'Customer Name',
    jewelryTypeLabel: 'Jewelry Type',
    sizeLabel: 'Size',
    materialLabel: 'Material',
    materialColorLabel: 'Material Color',
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
    copyForChat: 'Copy for Chat',
    copiedLabel: 'Copied!',
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

    // Trello Integration
    trelloIntegration: 'Trello Integration',
    trelloApiKey: 'Trello API Key',
    trelloApiToken: 'Trello API Token',
    trelloBoardId: 'Trello Board ID',
    trelloList: 'Trello List',
    createTrelloCard: 'Create Trello Card',
    creatingTrelloCard: 'Creating...',
    uploadingAttachments: 'Uploading attachments...',
    trelloCardCreated: 'Card Created!',
    trelloCreationFailed: 'Creation Failed.',
    trelloErrorFetching: 'Error fetching lists.',
    pinIncorrect: 'Incorrect PIN',
    tryAgainLater: 'Try again later...',

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
    pdfSizeLabel: 'Size:',
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

    // Copy for chat v2
    copy_greeting_v2: 'I would like to send a summary of the details for your special {jewelryType}.',
    copy_details_header_v2: 'Workpiece Details:',
    copy_size_line_v2: '- Size: {sizeDetails}',
    copy_main_stone_line_v2: '- Main Stone: {mainStoneRemarks}',
    copy_side_stones_line_v2: '- Side Stones: {sideStonesRemarks}',
    copy_body_line_v2: '- Setting: {material}',
    copy_total_line_v2: 'Total Amount: {finalPrice} THB',
    copy_deposit_info_v2: 'If you, Khun {customerName}, confirm the production order\n Please make a 50% deposit = {depositAmount} THB🙏🏻\nto start the work.',
    copy_payment_header_v2: 'Payment Method:',
    copy_payment_details_v2: 'Account Name: Mr. Dulawat Sansuriwong\nBank: Kasikornbank\nAccount No: 142-3-96854-7',
    copy_post_payment_info_v2: 'After I receive the deposit, I will start the production process immediately, which will take approximately 14-21 business days to create this masterpiece with utmost care.',
    copy_cancellation_header_v2: ' ',
    copy_cancellation_info_v2: 'As this is a made-to-order item, we reserve the right not to accept cancellations or returns after production has been confirmed.',
    copy_closing_v2: 'If you have any additional questions, please feel free to ask me anytime. 😊 Thank you for letting us be a part of creating this special piece of jewelry.',


    // Units
    gramsUnit: 'g',
    mmUnit: 'mm',
    cmUnit: 'cm',

    // Jewelry Types
    ring: 'Ring',
    bracelet: 'Bracelet',
    necklace: 'Necklace',
    earring: 'Earring',
    pendant: 'Pendant',
    
    // Earring Sizes
    s: 'S (3-5mm)',
    m: 'M (6-10mm)',
    l: 'L (11-15mm)',
    xl: 'XL (16-20mm)',

    // Materials
    silver925: 'Silver 925',
    gold9k: 'Gold 9k',
    gold14k: 'Gold 14k',
    gold18k: 'Gold 18k',
    pt950: 'Platinum 950',
    yellowGold: 'Yellow Gold',
    whiteGold: 'White Gold',
    roseGold: 'Rose Gold',

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
    VVS: 'VVS',
    VS: 'VS',
    SI: 'SI',

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

    // PIN Unlock
    enterPinPrompt: 'Enter PIN',
  },
  th: {
    // App
    language: 'ภาษา',
    
    // Form Labels
    customerNameLabel: 'ชื่อลูกค้า',
    jewelryTypeLabel: 'ประเภทเครื่องประดับ',
    sizeLabel: 'ขนาด',
    materialLabel: 'วัสดุ',
    materialColorLabel: 'สีวัสดุ',
    gramsVisibilityLabel: 'น้ำหนักในใบเสนอราคา',
    refImagesLabel: 'รูปภาพอ้างอิง (สูงสุด 5 รูป)',
    cadCostLabel: 'ค่าออกแบบสามมิติ',
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
    copyForChat: 'คัดลอกข้อมูล',
    copiedLabel: 'คัดลอกแล้ว!',
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

    // Trello Integration
    trelloIntegration: 'เชื่อมต่อ Trello',
    trelloApiKey: 'Trello API Key',
    trelloApiToken: 'Trello API Token',
    trelloBoardId: 'Trello Board ID',
    trelloList: 'ลิสต์ใน Trello',
    createTrelloCard: 'สร้างการ์ด Trello',
    creatingTrelloCard: 'กำลังสร้าง...',
    uploadingAttachments: 'กำลังอัปโหลดไฟล์แนบ...',
    trelloCardCreated: 'สร้างการ์ดแล้ว!',
    trelloCreationFailed: 'สร้างไม่สำเร็จ',
    trelloErrorFetching: 'ดึงข้อมูลลิสต์ไม่ได้',
    pinIncorrect: 'PIN ไม่ถูกต้อง',
    tryAgainLater: 'ลองใหม่อีกครั้ง...',
    
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
    pdfSizeLabel: 'ขนาด:',
    pdfMaterialLabel: 'วัสดุ:',
    pdfMainStoneLabel: 'Main stone:',
    pdfSideStoneLabel: 'Side stones:',
    pdfMaterialPricePerGramLabel: 'ราคาวัสดุ (ต่อกรัม)',
    pdfTotalMaterialCostLabel: 'ราคารวมวัสดุ',
    pdfCadCostLabel: 'ค่าออกแบบสามมิติ',
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
    pdfLeadTimeText: 'ใช้ระยะเวลาในการผลิตประมาณ 14 วัน หลังจากได้รับเงินมัดจำและยืนยันแบบการผลิตแล้ว',
    pdfCancellationTitle: 'นโยบายการยกเลิก/คืนสินค้า',
    pdfCancellationText: 'เนื่องจากเป็นสินค้าสั่งทำพิเศษ (Made-to-Order) ทางร้านขออนุญาตสงวนสิทธิ์ไม่รับยกเลิกหรือคืนสินค้าหลังจากที่ยืนยันการผลิตแล้วนะครับ',
    // Copy for chat v2
    copy_greeting_v2: 'ผมขออนุญาตส่งสรุปรายละเอียดสำหรับ{jewelryType}วงพิเศษนะครับ',
    copy_details_header_v2: 'รายละเอียดชิ้นงาน:',
    copy_size_line_v2: '- ขนาด: {sizeDetails}',
    copy_main_stone_line_v2: '- เพชรเม็ดหลัก: {mainStoneRemarks}',
    copy_side_stones_line_v2: '- เพชรข้าง: {sideStonesRemarks}',
    copy_body_line_v2: '- ตัวเรือน: {material}',
    copy_total_line_v2: 'ยอดรวมสุทธิ: {finalPrice} บาท',
    copy_deposit_info_v2: 'หากคุณ{customerName}คอนเฟิร์มสั่งผลิต\n🙏🏻ชำระมัดจำ 50% = {depositAmount} บาท🙏🏻\nเพื่อเริ่มงานได้เลยครับ',
    copy_payment_header_v2: 'ช่องทางการชำระเงิน:',
    copy_payment_details_v2: 'ชื่อบัญชี: นาย ดลวัฒน์ แสนสุริวงค์\nธนาคาร: กสิกรไทย\nเลขที่: 142-3-96854-7',
    copy_post_payment_info_v2: 'หลังจากได้รับยอดมัดจำแล้ว ทางร้านจะรีบดำเนินกระบวนการผลิตทันที ซึ่งจะใช้เวลาประมาณ 14 วันเพื่อสร้างสรรค์ผลงานชิ้นนี้อย่างสุดฝีมือเลยครับ',
    copy_cancellation_header_v2: '',
    copy_cancellation_info_v2: 'เนื่องจากเป็นสินค้าสั่งทำพิเศษ (Made-to-Order) ทางร้านขออนุญาตสงวนสิทธิ์ไม่รับยกเลิกหรือคืนสินค้าหลังจากที่ยืนยันการผลิตแล้วนะครับ',
    copy_closing_v2: 'หากมีคำถามเพิ่มเติมตรงไหน สอบถามผมได้ตลอดเลยนะครับ 😊 ขอบคุณที่ให้เราได้เป็นส่วนหนึ่งในการสร้างสรรค์เครื่องประดับชิ้นพิเศษครับ',

    // Units
    gramsUnit: 'ก',
    mmUnit: 'มม.',
    cmUnit: 'ซม.',
    
    // Jewelry Types
    ring: 'แหวน',
    bracelet: 'สร้อยข้อมือ/กำไลข้อมือ',
    necklace: 'สร้อยคอ',
    earring: 'ต่างหู',
    pendant: 'จี้',

    // Earring Sizes
    s: 'S (3-5มม.)',
    m: 'M (6-10มม.)',
    l: 'L (11-15มม.)',
    xl: 'XL (16-20มม.)',

    // Materials
    silver925: 'เงิน 925',
    gold9k: 'ทอง 9k',
    gold14k: 'ทอง 14k',
    gold18k: 'ทอง 18k',
    pt950: 'แพลทินัม 950',
    yellowGold: 'ทองคำ',
    whiteGold: 'ทองคำขาว',
    roseGold: 'โรสโกลด์',
    
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
    VVS: 'VVS',
    VS: 'VS',
    SI: 'SI',
    
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

    // PIN Unlock
    enterPinPrompt: 'ใส่รหัส PIN',
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