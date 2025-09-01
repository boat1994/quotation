


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
    platingColorLabel: 'Plating Color',
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
    remarksPlaceholder: 'details',
    additionalRemarksPlaceholder: 'Additional Remarks (optional)',
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
    confirmBtn: 'Confirm',

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
    remarksLabel: 'Remarks:',
    shopPdfFilename: '[FOR SHOP] project details for k. {customerName}-{date}.pdf',
    customerPdfFilename: '[For Customer]  Quotation for k. {customerName}-{date}.pdf',
    factoryPdfFilename: '[Work order] {jewelryType} {material} for k. {customerName} {date}.pdf',
    comparisonPdfFilename: '[Comparison] Quotation for k. {customerName}-{date}.pdf',
    
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
    pdfWeightVariationTitle: 'Jewelry Weight',
    pdfWeightVariationText: "The actual weight of the piece may vary slightly depending on the customer's size and the nature of handmade production.",
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
    copy_cancellation_header_v2: 'A quick note:',
    copy_cancellation_info_v2: 'As this is a made-to-order item, we reserve the right not to accept cancellations or returns after production has been confirmed.',
    copy_closing_v2: 'If you have any additional questions, please feel free to ask me anytime. 😊 Thank you for letting us be a part of creating this special piece of jewelry.',

    // Weight Converter
    weightConverterTitle: 'Karat Weight Converter',
    originalMaterialLabel: 'Original Material',
    originalWeightLabel: 'Original Weight (g)',
    calculateBtnConverter: 'Calculate',
    resultsHeader: 'Results',
    materialHeader: 'Material',
    calculatedWeightHeader: 'Calculated Weight (g)',
    weightError: 'Please enter a positive number for the weight.',
    
    // Weight Converter Materials
    sterlingSilver: 'Sterling Silver',
    gold9ct: '9ct Gold',
    gold14ct: '14ct Gold',
    gold18ct: '18ct Gold',
    gold22ct: '22ct Gold',
    fineGold: 'Fine Gold (24K)',
    platinum: 'Platinum',

    // Material Conversion
    materialConversionTitle: 'Material & Price Comparison',
    exportComparisonPdfBtn: 'Export Comparison PDF',
    comparisonPdfTitle: 'Price Comparison Quotation',
    comparisonMaterial: 'Material',
    comparisonWeight: 'Est. Weight',
    comparisonPrice: 'Est. Price',
    confirmMaterialChangeTitle: 'Confirm Material Change',
    confirmMaterialChangeMessage: 'This will update the main form with {materialName} at an estimated weight of {weight}g and close this summary. Do you want to proceed?',


    // Units
    gramsUnit: 'g',
    mmUnit: 'mm',
    cmUnit: 'cm',
    pcsUnit: 'Pcs',

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
    rhodium: 'Rhodium',
    yellowGoldPlating: 'Yellow Gold Plating',
    roseGoldPlating: 'Rose Gold Plating',

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
    platingColorLabel: 'สีชุบ',
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
    remarksPlaceholder: 'รายละเอียด',
    additionalRemarksPlaceholder: 'หมายเหตุเพิ่มเติม (ถ้ามี)',
    weightPlaceholder: 'น้ำหนัก (กะรัต)',
    marginPlaceholder: 'เช่น 20',
    pricePerCaratPlaceholder: 'ราคา/กะรัต',

    // Buttons
    modeRemarks: 'กรอกรายละเอียด',
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
    confirmBtn: 'ยืนยัน',

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
    factoryPdfTitle: 'Spec order',
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
    remarksLabel: 'หมายเหตุ:',
    shopPdfFilename: '[สำหรับร้าน] รายละเอียดโปรเจค คุณ {customerName}-{date}.pdf',
    customerPdfFilename: '[สำหรับลูกค้า]  ใบเสนอราคา คุณ {customerName}-{date}.pdf',
    factoryPdfFilename: '[ใบสั่งผลิต] {jewelryType} {material} คุณ {customerName}-{date}.pdf',
    comparisonPdfFilename: '[เปรียบเทียบ] ใบเสนอราคา คุณ {customerName}-{date}.pdf',
    
    pdfTermsTitle: 'เงื่อนไขและข้อตกลง',
    pdfPriceValidityTitle: 'การยืนราคา',
    pdfPriceValidityText: 'ใบเสนอราคามีอายุ 7 วัน นับจากวันที่ออกเอกสาร',
    pdfPaymentTermsTitle: 'เงื่อนไขการชำระเงิน',
    pdfPaymentTerm1: 'ชำระเงินมัดจำ 50% ของยอดรวมสุทธิ เพื่อยืนยันการสั่งผลิต',
    pdfPaymentTerm2: 'ชำระส่วนที่เหลืออีก 50% ก่อนการจัดส่งสินค้า',
    pdfPaymentMethodTitle: 'ช่องทางการชำระเงิน',
    pdfPaymentMethodText: 'ชื่อบัญชี: นาย ดลวัฒน์ แสนสุริวงค์\nธนาคาร: กสิกรไทย\nเลขที่บัญชี: 142-3-96854-7',
    pdfLeadTimeTitle: 'ระยะเวลาการผลิต',
    pdfLeadTimeText: 'ประมาณ 14-21 วันทำการ หลังจากได้รับเงินมัดจำและยืนยันแบบ',
    pdfWeightVariationTitle: 'น้ำหนักตัวเรือน',
    pdfWeightVariationText: 'น้ำหนักตัวเรือนจริงสามารถขึ้นลงได้ อันเกิดจากไซส์ของลูกค้าแต่ละท่านและเนื่องจากสินค้าเป็นการผลิตด้วยมือชิ้นต่อชิ้น',
    pdfCancellationTitle: 'การยกเลิก/คืนสินค้า',
    pdfCancellationText: 'เนื่องจากเป็นสินค้าสั่งทำพิเศษ จึงไม่สามารถยกเลิก, เปลี่ยนแปลง, หรือคืนสินค้าได้หลังจากยืนยันการผลิตแล้ว',
    
    // Copy for chat v2
    copy_greeting_v2: 'ขออนุญาตส่งสรุปรายละเอียดงาน {jewelryType} ชิ้นพิเศษของคุณลูกค้านะครับ',
    copy_details_header_v2: 'รายละเอียดชิ้นงาน:',
    copy_size_line_v2: '- ขนาด: {sizeDetails}',
    copy_main_stone_line_v2: '- เพชรยอด: {mainStoneRemarks}',
    copy_side_stones_line_v2: '- เพชรบ่า: {sideStonesRemarks}',
    copy_body_line_v2: '- ตัวเรือน: {material}',
    copy_total_line_v2: 'ยอดรวมทั้งหมด: {finalPrice} บาท',
    copy_deposit_info_v2: 'หากคุณ {customerName} ยืนยันการสั่งผลิต\nรบกวนมัดจำ 50% = {depositAmount} บาท🙏🏻\nเพื่อเริ่มงานครับ',
    copy_payment_header_v2: 'ช่องทางการชำระเงิน:',
    copy_payment_details_v2: 'ชื่อบัญชี: นาย ดลวัฒน์ แสนสุริวงค์\nธนาคาร: กสิกรไทย\nเลขที่บัญชี: 142-3-96854-7',
    copy_post_payment_info_v2: 'หลังจากได้รับยอดมัดจำแล้ว ทางเราจะเริ่มกระบวนการผลิตทันที ซึ่งจะใช้เวลาประมาณ 14-21 วันทำการในการรังสรรค์ผลงานชิ้นเอกนี้ด้วยความใส่ใจสูงสุดครับ',
    copy_cancellation_header_v2: 'หมายเหตุเล็กน้อย:',
    copy_cancellation_info_v2: 'เนื่องจากเป็นสินค้าสั่งทำพิเศษ ทางเราขอสงวนสิทธิ์ไม่รับยกเลิกหรือคืนสินค้าหลังจากยืนยันการผลิตแล้วนะครับ',
    copy_closing_v2: 'หากมีคำถามเพิ่มเติม สอบถามได้ตลอดเลยนะครับ 😊 ขอบคุณที่ให้เราเป็นส่วนหนึ่งในการสร้างสรรค์เครื่องประดับชิ้นพิเศษนี้ครับ',

    // Weight Converter
    weightConverterTitle: 'คำนวณน้ำหนักโลหะ',
    originalMaterialLabel: 'วัสดุต้นทาง',
    originalWeightLabel: 'น้ำหนักต้นทาง (กรัม)',
    calculateBtnConverter: 'คำนวณ',
    resultsHeader: 'ผลลัพธ์',
    materialHeader: 'วัสดุ (Material)',
    calculatedWeightHeader: 'น้ำหนักที่คำนวณได้ (กรัม)',
    weightError: 'กรุณาป้อนน้ำหนักเป็นตัวเลขบวก',

    // Weight Converter Materials
    sterlingSilver: 'เงินแท้ (Sterling Silver)',
    gold9ct: 'ทอง 9ct',
    gold14ct: 'ทอง 14ct',
    gold18ct: 'ทอง 18ct',
    gold22ct: 'ทอง 22ct',
    fineGold: 'ทองคำแท้ (24K)',
    platinum: 'แพลทินัม (Platinum)',

    // Material Conversion
    materialConversionTitle: 'เปรียบเทียบราคาและวัสดุ',
    exportComparisonPdfBtn: 'Export PDF เปรียบเทียบ',
    comparisonPdfTitle: 'ใบเสนอราคาเปรียบเทียบ',
    comparisonMaterial: 'วัสดุ',
    comparisonWeight: 'น้ำหนัก (โดยประมาณ)',
    comparisonPrice: 'ราคา (โดยประมาณ)',
    confirmMaterialChangeTitle: 'ยืนยันการเปลี่ยนวัสดุ',
    confirmMaterialChangeMessage: 'การดำเนินการนี้จะอัปเดตข้อมูลในฟอร์มหลักเป็น {materialName} ที่น้ำหนักประมาณ {weight}g และปิดหน้าต่างนี้ คุณต้องการดำเนินการต่อหรือไม่?',
    
    // Units
    gramsUnit: 'กรัม',
    mmUnit: 'มม.',
    cmUnit: 'ซม.',
    pcsUnit: 'เม็ด',
    carat: 'กะรัต',

    // Jewelry Types
    ring: 'แหวน',
    bracelet: 'สร้อยข้อมือ',
    necklace: 'สร้อยคอ',
    earring: 'ต่างหู',
    pendant: 'จี้',
    
    // Earring Sizes
    s: 'S (3-5มม)',
    m: 'M (6-10มม)',
    l: 'L (11-15มม)',
    xl: 'XL (16-20มม)',

    // Materials
    silver925: 'เงิน 925',
    gold9k: 'ทอง 9k',
    gold14k: 'ทอง 14k',
    gold18k: 'ทอง 18k',
    pt950: 'แพลทินัม 950',
    yellowGold: 'ทองคำ',
    whiteGold: 'ทองคำขาว',
    roseGold: 'โรสโกลด์',
    rhodium: 'โรเดียม',
    yellowGoldPlating: 'ชุบทอง',
    roseGoldPlating: 'ชุบโรสโกลด์',

    // Diamond Shapes
    round: 'เพชรกลม',
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
    shapeLabel: 'รูปทรง',
    waitingForDetails: 'รอรายละเอียดเพชร...',
    color: 'น้ำ',
    cut: 'เจียระไน',
    clarity: 'ความสะอาด',
    polish: 'การขัดเงา',
    diameterLabel: 'ขนาด',
    pricePerCaratLabel: 'ราคาต่อกะรัต',

    // PIN Unlock
    enterPinPrompt: 'ใส่รหัส PIN',
  }
};

export const t = (lang, key, options = {}) => {
  let text = translations[lang]?.[key] || translations.en[key] || key;
  for (const optionKey in options) {
    text = text.replace(`{${optionKey}}`, options[optionKey]);
  }
  return text;
};