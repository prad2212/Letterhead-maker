/* 
  =========================================
  Letterhead Designer App - JavaScript Logic
  =========================================
*/

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  // --- STATE ---
  let state = {
    // Recipient Details
    recipientName: "Dr. Aaryan Sharma",
    recipientOrg: "Global Outreach Foundation",
    recipientAddress: "456 Philanthropy Way\nGreenwood District\nSeattle, WA 98101",
    letterDate: "", // will set to today on init
    
    // Content Details
    subject: "Letter of Deepest Appreciation for Your Exceptional Support",
    body: "On behalf of our entire organization, I am writing to express our profound gratitude for the extraordinary support you have extended to us during our recent initiatives. Your generous commitment of time, resources, and leadership has played a pivotal role in the success of our programs.\n\nBecause of your dedication, we have been able to expand our community outreach and directly impact over five hundred families in need. The passion and integrity you bring to our collaborative efforts serve as an inspiration to our team and volunteers alike.\n\nWe are truly honored to have you as a cornerstone supporter of our mission. Thank you once again for your remarkable generosity, kind spirit, and enduring partnership. We look forward to continuing our journey together to make a lasting difference.",
    
    // Letterhead Settings
    orgName: "Dhal Niradhar Charitable trust",
    orgTagline: "Nourishing Hope, Empowering Lives",
    orgPhone: "8767465469 / 7709854469",
    orgEmail: "dhalniradhartrustofficial@gmail.com",
    orgAddress: "Instagram: @dnctrust",
    orgReg: "Reg-E-0001346(LTR)",
    orgFooter: "",
    
    signerName: "Marcus Vance",
    signerTitle: "Executive Director",
    
    logoUrl: "imgs/Logo wide.png",      // Base64 Logo data
    stampUrl: "imgs/DNCT Stamp.png",     // Base64 Stamp data (if empty, uses SVG fallback)
    
    // Stamp Adjustments
    stampSize: 110,    // px
    stampRotation: -5, // degrees
    stampOpacity: 90,  // %
    stampLeft: "70%",  // percentage positioning
    stampTop: "75%",   // percentage positioning
    
    // Language settings
    language: "en"
  };

  // Pre-configured Thank You templates (localized for English, Marathi, Hindi)
  const templates = {
    en: {
      volunteer: {
        subject: "Expression of Gratitude for Outstanding Volunteer Service",
        body: "I am writing this letter to extend our heartfelt appreciation for your selfless dedication and outstanding service as a volunteer. Your commitment to our recent community cleanup and feeding drive has truly made an indelible impact.\n\nThanks to your incredible work ethic and positive attitude, our event ran seamlessly, and we were able to serve over three hundred warm meals to local residents. Your willingness to step in wherever needed embodies the true spirit of volunteerism and community leadership.\n\nWe are incredibly fortunate to have you as a key member of our volunteer family. Thank you once again for sharing your time, skills, and energy to support our vision. We look forward to working with you on future initiatives.",
        signerName: "Marcus Vance",
        signerTitle: "Executive Director"
      },
      donor: {
        subject: "Acknowledgment and Heartfelt Thanks for Your Generous Contribution",
        body: "We are deeply moved and incredibly grateful for your generous financial contribution to the Dhal Niradhar Charitable trust. Your support represents a vital lifeline that directly funds our outreach projects and support programs.\n\nWith your remarkable gift, we have secured essential food supplies and care packages for the upcoming quarter. Your contribution acts as a powerful catalyst, enabling our team to reach remote and marginalized families who would otherwise go without help.\n\nYour philanthropic spirit and belief in our mission inspire us daily. Enclosed with this letter, please find your official contribution receipt for tax purposes. Thank you once again for your kindness, vision, and investment in the well-being of our community.",
        signerName: "Evelyn Sterling",
        signerTitle: "Director of Philanthropy"
      },
      speaker: {
        subject: "Heartfelt Thanks for Your Inspiring Guest Presentation",
        body: "I am writing to express our sincere gratitude for the brilliant keynote address you delivered at our Annual Youth Empowerment Seminar. Your speech on resilience and creative problem-solving in the modern world resonated deeply with our entire audience.\n\nFeedback from the participants has been overwhelmingly positive, with many highlighting your interactive anecdotes as their favorite part of the day. The wisdom, practical strategies, and optimism you shared have equipped our young leaders with valuable tools to tackle their educational and professional aspirations.\n\nThank you for generously investing your valuable time, mentorship, and energy in the next generation. We are truly honored by your collaboration and hope to welcome you back to our future leadership events.",
        signerName: "Marcus Vance",
        signerTitle: "Executive Director"
      }
    },
    mr: {
      volunteer: {
        subject: "उत्कृष्ट स्वयंसेवक सेवेबद्दल मनःपूर्वक आभार",
        body: "मी हे पत्र आमच्या संपूर्ण संस्थेच्या वतीने तुमच्या निःस्वार्थ सेवा आणि उत्कृष्ट स्वयंसेवक कार्याबद्दल मनापासून आभार मानण्यासाठी लिहीत आहे. आमच्या अलीकडील सामाजिक स्वच्छता आणि अन्नदान मोहिमेत तुमच्या योगदानाने खरोखरच मोलाची मदत केली आहे.\n\nतुमच्या उत्कृष्ट कार्यपद्धतीमुळे आणि सकारात्मक दृष्टिकोनामुळे हा कार्यक्रम अत्यंत यशस्वीरित्या पार पडला. आम्ही ३०० हून अधिक गरजू नागरिकांना अन्नदान करू शकलो. तुमची ही सेवावृत्ती इतरांसाठी प्रेरणादायी आहे.\n\nआमच्या संस्थेच्या स्वयंसेवक कुटुंबात तुमचे असणे आमच्यासाठी अत्यंत भाग्याचे आहे. तुमच्या अमूल्य वेळ, कौशल्ये आणि उर्जेबद्दल पुन्हा एकदा धन्यवाद. भविष्यातील उपक्रमांमध्येही तुमच्यासोबत काम करण्यास आम्ही उत्सुक आहोत.",
        signerName: "मार्क्स व्हॅन्स",
        signerTitle: "कार्यकारी संचालक"
      },
      donor: {
        subject: "आपल्या उदार देणगीबद्दल कृतज्ञता व आभार पत्र",
        body: "ढाल निराधार चॅरिटेबल ट्रस्टला आपण दिलेल्या उदार आर्थिक देणगीबद्दल आम्ही अत्यंत कृतज्ञ आहोत. आपले हे सहकार्य आमच्या सामाजिक कल्याण योजना आणि उपक्रमांसाठी अत्यंत मोलाचे आहे.\n\nआपल्या या महत्त्वपूर्ण देणगीमुळे आम्ही आगामी त्रैमासिकासाठी आवश्यक अन्नधान्य आणि अन्नछत्राची सोय करू शकलो आहोत. आपले हे योगदान वंचित आणि गरजू कुटुंबांपर्यंत मदत पोहोचवण्यासाठी अत्यंत महत्त्वाचे ठरले आहे.\n\nतुमची दानशूर वृत्ती आणि आमच्या ध्येयावरील विश्वास आम्हाला दररोज प्रेरणा देतो. या पत्रासोबत अधिकृत कर सवलत पावती जोडलेली आहे. तुमच्या या सहकार्याबद्दल मनःपूर्वक धन्यवाद.",
        signerName: "एव्हलिन स्टर्लिंग",
        signerTitle: "देणगी व विकास संचालक"
      },
      speaker: {
        subject: "आपल्या मार्गदर्शनाबद्दल आणि व्याख्यानाबद्दल मनःपूर्वक आभार",
        body: "आमच्या वार्षिक युवा सक्षमीकरण चर्चासत्रात आपण दिलेल्या उत्कृष्ट व्याख्यानाबद्दल मी आपले मनापासून आभार मानतो. आजच्या बदलत्या जगात सकारात्मक राहणे आणि आव्हानांना सामोरे जाणे या विषयावरील आपले विचार सर्वांना अत्यंत भावले.\n\nसर्व उपस्थित तरुणांकडून अत्यंत सकारात्मक प्रतिसाद मिळाला असून, आपल्या संवादात्मक शैलीचे सर्वांनी कौतुक केले आहे. आपल्या अनुभवाचा आणि मार्गदर्शनाचा तरुणांना त्यांच्या शैक्षणिक व व्यावसायिक वाटचालीत नक्कीच फायदा होईल.\n\nआपला अमूल्य वेळ आणि मार्गदर्शन दिल्याबद्दल आम्ही आपले सदैव ऋणी राहू. आपल्या सहकार्याबद्दल धन्यवाद आणि भविष्यातील कार्यक्रमांमध्येही आपले स्वागत करण्यास आम्ही उत्सुक आहोत.",
        signerName: "मार्क्स व्हॅन्स",
        signerTitle: "कार्यकारी संचालक"
      }
    },
    hi: {
      volunteer: {
        subject: "उत्कृष्ट स्वयंसेवक सेवा के लिए हार्दिक आभार",
        body: "मैं यह पत्र हमारी संपूर्ण संस्था की ओर से आपके निस्वार्थ सेवा भाव और उत्कृष्ट स्वयंसेवक कार्य के प्रति हार्दिक आभार व्यक्त करने के लिए लिख रहा हूँ। हमारे हालिया स्वच्छता और अन्नदान अभियान में आपकी समर्पित भागीदारी ने वास्तव में एक महत्वपूर्ण प्रभाव डाला है।\n\nआपकी कड़ी मेहनत और सकारात्मक दृष्टिकोण के कारण हमारा यह कार्यक्रम पूरी तरह सफल रहा और हम तीन सौ से अधिक जरूरतमंद परिवारों को भोजन सेवा प्रदान करने में सक्षम हुए। आपकी यह सेवा भावना हमारी टीम और अन्य स्वयंसेवकों के लिए एक प्रेरणा है।\n\nहमें अत्यंत गर्व है कि आप हमारे स्वयंसेवक परिवार के एक प्रमुख सदस्य हैं। संस्था को अपना अमूल्य समय, कौशल और ऊर्जा प्रदान करने के लिए धन्यवाद। हम भविष्य की पहलों में भी आपके साथ मिलकर कार्य करने की आशा करते हैं।",
        signerName: "मार्क्स वेंस",
        signerTitle: "कार्यकारी निदेशक"
      },
      donor: {
        subject: "आपके उदार दान और सहयोग के लिए हार्दिक धन्यवाद",
        body: "ढाल निराधार चैरिटेबल ट्रस्ट को आपके द्वारा प्रदान किए गए उदार आर्थिक सहयोग के लिए हम आपके प्रति अत्यंत कृतज्ञ हैं। आपका यह सहयोग हमारी सामाजिक कल्याण परियोजनाओं और सहायता कार्यक्रमों को निरंतर चलाने में अत्यंत महत्वपूर्ण है।\n\nआपके इस महत्वपूर्ण दान से हम आगामी तिमाही के लिए आवश्यक राशन सामग्री और सहायता किट सुरक्षित करने में सफल हुए हैं। आपका योगदान उन जरूरतमंद परिवारों तक मदद पहुंचाने में एक सेतु का कार्य करता है जो अन्यथा सहायता से वंचित रह जाते।\n\nआपकी परोपकारी भावना और हमारे मिशन पर आपका विश्वास हमें प्रतिदिन प्रेरित करता है। इस पत्र के साथ आधिकारिक दान रसीद संलग्न है। आपके इस बहुमूल्य सहयोग के लिए पुनः हृदय से धन्यवाद।",
        signerName: "एवलिन स्टर्लिंग",
        signerTitle: "दान एवं विकास निदेशक"
      },
      speaker: {
        subject: "प्रेरणादायक व्याख्यान और मार्गदर्शन के लिए हार्दिक आभार",
        body: "हमारे वार्षिक युवा सशक्तिकरण संगोष्ठी में आपके द्वारा दिए गए अत्यंत प्रेरणादायक और ज्ञानवर्धक व्याख्यान के लिए मैं हृदय से आभार व्यक्त करता हूँ। आधुनिक युग में संघर्षों से निपटने और सकारात्मकता बनाए रखने पर आपके विचारों ने उपस्थित सभी युवाओं को गहराई से प्रभावित किया।\n\nप्रतिभागियों से मिली प्रतिक्रिया अत्यंत उत्साहजनक रही है, और कई लोगों ने आपके व्यक्तिगत अनुभवों और उदाहरणों की बहुत सराहना की। आपके द्वारा साझा किया गया ज्ञान और रणनीतियाँ हमारे युवाओं को उनके शैक्षणिक और व्यावसायिक लक्ष्यों को प्राप्त करने में निश्चित रूप से संबल प्रदान करेंगी।\n\nअपनी व्यस्त दिनचर्या में से अमूल्य समय निकालकर हमारा मार्गदर्शन करने के लिए पुनः धन्यवाद। हम भविष्य में भी आपके साथ ऐसी ही सहभागिता की आशा करते हैं।",
        signerName: "मार्क्स वेंस",
        signerTitle: "कार्यकारी निदेशक"
      }
    }
  };

  // Default values for initial load of each language
  const defaultContent = {
    en: {
      subject: "Letter of Deepest Appreciation for Your Exceptional Support",
      body: "On behalf of our entire organization, I am writing to express our profound gratitude for the extraordinary support you have extended to us during our recent initiatives. Your generous commitment of time, resources, and leadership has played a pivotal role in the success of our programs.\n\nBecause of your dedication, we have been able to expand our community outreach and directly impact over five hundred families in need. The passion and integrity you bring to our collaborative efforts serve as an inspiration to our team and volunteers alike.\n\nWe are truly honored to have you as a cornerstone supporter of our mission. Thank you once again for your remarkable generosity, kind spirit, and enduring partnership. We look forward to continuing our journey together to make a lasting difference."
    },
    mr: {
      subject: "आपल्या अमूल्य आणि शाश्वत सहकार्याबद्दल मनःपूर्वक आभार",
      body: "ढाल निराधार चॅरिटेबल ट्रस्टच्या वतीने, मी आमच्या नुकत्याच राबविण्यात आलेल्या उपक्रमांमध्ये आपण दिलेल्या अनन्यसाधारण सहकार्याबद्दल आमची मनापासून कृतज्ञता व्यक्त करण्यासाठी हे पत्र लिहीत आहे. आपले योगदान आमच्या मोहिमेच्या यशासाठी अत्यंत महत्त्वाचे ठरले आहे.\n\nआपल्या या सहकार्यामुळे आम्ही आमच्या मदत कक्षाचा विस्तार करू शकलो आणि गरजू कुटुंबांपर्यंत थेट मदत पोहोचवू शकलो. आपण या कार्यात दाखविलेले सातत्य आणि निष्ठा आमच्या संपूर्ण चमूसाठी अत्यंत प्रेरणादायी आहे.\n\nआमच्या या उदात्त कार्यात आपले मोलाचे योगदान मिळाल्याबद्दल आम्ही स्वतःला भाग्यवान समजतो. आपल्या दयाळू वृत्तीबद्दल आणि दृढ भागीदारीबद्दल पुन्हा एकदा मनःपूर्वक धन्यवाद।"
    },
    hi: {
      subject: "आपके असाधारण और निरंतर सहयोग के लिए हार्दिक धन्यवाद",
      body: "ढाल निराधार चैरिटेबल ट्रस्ट की ओर से, मैं हाल ही में आयोजित हमारे विभिन्न सेवा कार्यों में आपके द्वारा दिए गए अद्वितीय सहयोग के प्रति अपनी गहरी कृतज्ञता व्यक्त करने के लिए यह पत्र लिख रहा हूँ। आपका बहुमूल्य योगदान हमारे कार्यक्रमों की सफलता में एक मील का पत्थर साबित हुआ है।\n\nआपके इस सहयोग से हम अपनी सामाजिक सेवाओं का विस्तार करने और जरूरतमंद परिवारों तक सीधे सहायता पहुँचाने में सफल रहे हैं। इस पुनीत कार्य में आपकी निष्ठा और समर्पण हमारी पूरी टीम के लिए प्रेरणा स्रोत है।\n\nहमें अत्यंत गर्व है कि आप हमारे इस मिशन के एक मजबूत स्तंभ हैं। आपके दयालु स्वभाव और दीर्घकालिक साझेदारी के लिए पुनः सहृदय धन्यवाद।"
    }
  };

  // Default Fallback Stamp SVG Data
  const defaultStampSVG = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120' width='120' height='120'><circle cx='60' cy='60' r='54' fill='none' stroke='%23d97706' stroke-width='4' stroke-dasharray='4,4'/><circle cx='60' cy='60' r='46' fill='none' stroke='%23d97706' stroke-width='2'/><text x='50%25' y='36%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-weight='bold' font-size='9' fill='%23d97706' letter-spacing='1'>OFFICIAL STAMP</text><path d='M 25 60 L 95 60' stroke='%23d97706' stroke-width='2'/><text x='50%25' y='52%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-weight='bold' font-size='10' fill='%23d97706' letter-spacing='0.5'>APPROVED</text><text x='50%25' y='68%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='6' fill='%23d97706'>DNCT TRUST</text><circle cx='60' cy='60' r='40' fill='none' stroke='%23d97706' stroke-width='1' stroke-opacity='0.4'/><text x='50%25' y='88%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-weight='600' font-size='7' fill='%23d97706'>GRATITUDE</text></svg>`;

  // --- ELEMENT SELECTORS ---
  
  // Tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  // Inputs: Recipient
  const inputRecName = document.getElementById('input-rec-name');
  const inputRecOrg = document.getElementById('input-rec-org');
  const inputRecAddress = document.getElementById('input-rec-address');
  const inputDate = document.getElementById('input-date');
  
  // Inputs: Content
  const inputSubject = document.getElementById('input-subject');
  const inputBody = document.getElementById('input-body');
  const templateCards = document.querySelectorAll('.template-card');
  
  // Inputs: Settings/Letterhead
  const inputOrgName = document.getElementById('input-org-name');
  const inputOrgTagline = document.getElementById('input-org-tagline');
  const inputOrgPhone = document.getElementById('input-org-phone');
  const inputOrgEmail = document.getElementById('input-org-email');
  const inputOrgAddress = document.getElementById('input-org-address');
  const inputOrgReg = document.getElementById('input-org-reg');
  const inputOrgFooter = document.getElementById('input-org-footer');
  const inputSignerName = document.getElementById('input-signer-name');
  const inputSignerTitle = document.getElementById('input-signer-title');
  
  // Image Uploads
  const uploadStamp = document.getElementById('upload-stamp');
  const uploadLogo = document.getElementById('upload-logo');
  const btnRemoveLogo = document.getElementById('btn-remove-logo');
  
  // Sliders
  const sliderStampSize = document.getElementById('slider-stamp-size');
  const sliderStampRot = document.getElementById('slider-stamp-rot');
  const sliderStampOpac = document.getElementById('slider-stamp-opac');
  
  // Slider values text
  const valStampSize = document.getElementById('stamp-size-val');
  const valStampRot = document.getElementById('stamp-rot-val');
  const valStampOpac = document.getElementById('stamp-opac-val');
  
  // Preview Canvas elements
  const canvasElement = document.getElementById('printable-area');
  const letterLogo = document.getElementById('letter-logo');
  const letterOrgName = document.getElementById('letter-org-name');
  const letterOrgTagline = document.getElementById('letter-org-tagline');
  const letterRegDisplay = document.getElementById('letter-reg-display');
  const letterOrgContacts = document.getElementById('letter-org-contacts');
  const letterRecName = document.getElementById('letter-rec-name');
  const letterRecOrg = document.getElementById('letter-rec-org');
  const letterRecAddress = document.getElementById('letter-rec-address');
  const letterDateDisplay = document.getElementById('letter-date-display');
  const letterSubjectDisplay = document.getElementById('letter-subject-display');
  const letterContentDisplay = document.getElementById('letter-content-display');
  const letterSignerName = document.getElementById('letter-signer-name');
  const letterSignerTitle = document.getElementById('letter-signer-title');
  const letterFooterDisplay = document.getElementById('letter-footer-display');
  
  // Stamp draggable elements
  const draggableStamp = document.getElementById('draggable-stamp');
  const stampImageElement = document.getElementById('stamp-image-element');
  const stampResizer = document.getElementById('stamp-resizer');
  
  // Language Selectors
  const selectLanguage = document.getElementById('select-language');
  const letterRecipientTo = document.getElementById('letter-recipient-to');
  const letterClosingText = document.getElementById('letter-closing-text');
  
  // Sidebar Action Buttons
  const btnSaveDocument = document.getElementById('btn-save-document');
  const btnPrint = document.getElementById('btn-print');
  const btnClear = document.getElementById('btn-clear');
  
  // History Sidebar elements
  const historySidebar = document.getElementById('history-sidebar');
  const btnToggleHistory = document.getElementById('btn-toggle-history');
  const btnCloseHistory = document.getElementById('btn-close-history');
  const historyContainer = document.getElementById('history-container');
  
  // Notification Toast
  const toastElement = document.getElementById('notification-toast');
  const toastMessage = document.getElementById('notification-message');

  // User Accounts & Authentication selectors (Modal & Dropdown-based)
  const authModal = document.getElementById('auth-modal');
  const modalTabSignIn = document.getElementById('modal-tab-signin');
  const modalTabSignUp = document.getElementById('modal-tab-signup');
  const modalAuthTitle = document.getElementById('modal-auth-title');
  const modalAuthDesc = document.getElementById('modal-auth-desc');
  const modalFormAuth = document.getElementById('modal-form-auth');
  const modalGroupName = document.getElementById('modal-group-name');
  const modalInputName = document.getElementById('modal-input-name');
  const modalInputEmail = document.getElementById('modal-input-email');
  const modalInputPassword = document.getElementById('modal-input-password');
  const modalGroupPassword = document.getElementById('modal-group-password');
  const modalBtnSubmit = document.getElementById('modal-btn-submit');
  const btnForgotPassword = document.getElementById('btn-forgot-password');
  const modalGuestDivider = document.getElementById('modal-guest-divider');
  const modalBtnGuest = document.getElementById('modal-btn-guest');
  
  const headerUserMenu = document.getElementById('header-user-menu');
  const userMenuTrigger = document.getElementById('user-menu-trigger');
  const userDropdownCard = document.getElementById('user-dropdown-card');
  const dropdownUserName = document.getElementById('dropdown-user-name');
  const dropdownUserEmail = document.getElementById('dropdown-user-email');
  const dropdownBtnSignOut = document.getElementById('dropdown-btn-signout');

  // --- INITIALIZATION ---
  
  function init() {
    // 1. Set default date to today
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    inputDate.value = formattedDate;
    state.letterDate = formattedDate;
    
    // 2. Load settings from State into Inputs
    syncStateToInputs();
    
    // 3. Update Preview
    renderPreview();
    
    // 4. Initialize Local Auth & UI
    initAuth();
    
    // 5. Load Saved History List
    renderHistory();
    
    // 6. Setup drag & resize on stamp
    setupDraggableStamp();
    
    // 7. Initialize mobile viewport scaling & view toggles
    initMobileResponsiveness();
    
    // Check if user uploaded a default logo in localStorage
    if (localStorage.getItem('letterhead_logo')) {
      state.logoUrl = localStorage.getItem('letterhead_logo');
      renderPreview();
    }
  }

  // --- TAB NAVIGATION ---
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      // Add active to current button
      button.classList.add('active');
      
      // Toggle visibility of panels
      const targetPanel = button.getAttribute('data-tab');
      tabPanels.forEach(panel => {
        if (panel.id === targetPanel) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // --- STATE INTERACTION ---

  // Synchronize internal state structure directly with GUI form inputs
  function syncStateToInputs() {
    inputRecName.value = state.recipientName;
    inputRecOrg.value = state.recipientOrg;
    inputRecAddress.value = state.recipientAddress;
    inputDate.value = state.letterDate;
    
    inputSubject.value = state.subject;
    inputBody.value = state.body;
    
    inputOrgName.value = state.orgName;
    inputOrgTagline.value = state.orgTagline;
    inputOrgPhone.value = state.orgPhone;
    inputOrgEmail.value = state.orgEmail;
    inputOrgAddress.value = state.orgAddress;
    inputOrgReg.value = state.orgReg || "";
    inputOrgFooter.value = state.orgFooter || "";
    inputSignerName.value = state.signerName;
    inputSignerTitle.value = state.signerTitle;
    
    if (selectLanguage) {
      selectLanguage.value = state.language;
    }
    
    // Sliders
    sliderStampSize.value = state.stampSize;
    valStampSize.textContent = `${state.stampSize}px`;
    
    sliderStampRot.value = state.stampRotation;
    valStampRot.textContent = `${state.stampRotation}°`;
    
    sliderStampOpac.value = state.stampOpacity;
    valStampOpac.textContent = `${state.stampOpacity}%`;
  }

  // Synchronize inputs back to internal state
  function updateStateFromInputs() {
    state.recipientName = inputRecName.value;
    state.recipientOrg = inputRecOrg.value;
    state.recipientAddress = inputRecAddress.value;
    state.letterDate = inputDate.value;
    
    state.subject = inputSubject.value;
    state.body = inputBody.value;
    
    state.orgName = inputOrgName.value;
    state.orgTagline = inputOrgTagline.value;
    state.orgPhone = inputOrgPhone.value;
    state.orgEmail = inputOrgEmail.value;
    state.orgAddress = inputOrgAddress.value;
    state.orgReg = inputOrgReg.value;
    state.orgFooter = inputOrgFooter.value;
    state.signerName = inputSignerName.value;
    state.signerTitle = inputSignerTitle.value;
    
    if (selectLanguage) {
      state.language = selectLanguage.value;
    }
    
    state.stampSize = parseInt(sliderStampSize.value);
    state.stampRotation = parseInt(sliderStampRot.value);
    state.stampOpacity = parseInt(sliderStampOpac.value);
  }

  // Render state data on the virtual A4 page
  function renderPreview() {
    // Brand Header
    letterOrgName.textContent = state.orgName;
    letterOrgTagline.textContent = state.orgTagline;
    if (letterRegDisplay) {
      if (state.orgReg) {
        letterRegDisplay.textContent = `Reg. No: ${state.orgReg}`;
        letterRegDisplay.style.display = 'block';
      } else {
        letterRegDisplay.style.display = 'none';
      }
    }
    
    // Logo render
    if (state.logoUrl) {
      letterLogo.src = state.logoUrl;
      letterLogo.style.display = 'block';
      btnRemoveLogo.style.display = 'flex';
      // Hide text branding since the logo contains organization name
      letterOrgName.style.display = 'none';
      letterOrgTagline.style.display = 'none';
    } else {
      letterLogo.src = '';
      letterLogo.style.display = 'none';
      btnRemoveLogo.style.display = 'none';
      // Show text branding
      letterOrgName.style.display = 'block';
      letterOrgTagline.style.display = 'block';
    }
    
    // Header Contacts (format lines with Lucide icons in precise requested order)
    const contactsHTML = [];
    
    // 1. Phone / Contact Number (First)
    if (state.orgPhone) {
      contactsHTML.push(`<div class="contact-item"><i data-lucide="phone" class="contact-icon"></i><span>${state.orgPhone}</span></div>`);
    }
    
    // 2. Email (Second)
    if (state.orgEmail) {
      contactsHTML.push(`<div class="contact-item"><i data-lucide="mail" class="contact-icon"></i><span>${state.orgEmail}</span></div>`);
    }
    
    // 3. Instagram ID and Address lines from state.orgAddress (Third)
    if (state.orgAddress) {
      const addressLines = state.orgAddress.split('\n');
      const instaLines = [];
      const plainLines = [];
      
      addressLines.forEach(line => {
        if (!line.trim()) return;
        if (line.toLowerCase().includes('instagram') || line.trim().startsWith('@')) {
          instaLines.push(line);
        } else {
          plainLines.push(line);
        }
      });
      
      // Instagram ID first (preceded by Instagram icon)
      instaLines.forEach(line => {
        const displayVal = line.replace(/instagram\s*:\s*/i, '').trim();
        contactsHTML.push(`<div class="contact-item"><i data-lucide="instagram" class="contact-icon"></i><span>${displayVal}</span></div>`);
      });
      
      // Address / Location lines at the bottom (plain text - NO location icon!)
      plainLines.forEach(line => {
        contactsHTML.push(`<div class="contact-item"><span>${line}</span></div>`);
      });
    }
    
    letterOrgContacts.innerHTML = contactsHTML.join('');
    
    // Re-trigger Lucide icon parsing for new dynamic icons
    lucide.createIcons();
    
    // Recipient block
    if (letterRecipientTo) {
      if (state.language === 'mr') {
        letterRecipientTo.textContent = 'प्रति,';
      } else if (state.language === 'hi') {
        letterRecipientTo.textContent = 'सेवा में,';
      } else {
        letterRecipientTo.textContent = 'To,';
      }
    }
    
    letterRecName.textContent = state.recipientName;
    
    if (state.recipientOrg) {
      letterRecOrg.textContent = state.recipientOrg;
      letterRecOrg.style.display = 'block';
    } else {
      letterRecOrg.style.display = 'none';
    }
    
    letterRecAddress.innerHTML = state.recipientAddress.replace(/\n/g, '<br>');
    
    // Date formatting (readable style localized by language)
    if (state.letterDate) {
      const parsedDate = new Date(state.letterDate);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      let locale = 'en-US';
      if (state.language === 'mr') {
        locale = 'mr-IN';
      } else if (state.language === 'hi') {
        locale = 'hi-IN';
      }
      letterDateDisplay.textContent = parsedDate.toLocaleDateString(locale, options);
    } else {
      letterDateDisplay.textContent = '';
    }
    
    // Subject & Content Body (localized subject prefix)
    if (state.language === 'mr' || state.language === 'hi') {
      letterSubjectDisplay.innerHTML = `<span style="font-weight: 800; color: var(--paper-text-title);">विषय:</span> ${state.subject}`;
    } else {
      letterSubjectDisplay.innerHTML = `<span style="font-weight: 800; color: var(--paper-text-title);">Subject:</span> ${state.subject}`;
    }
    
    // Render paragraphs separated by double newline
    const paragraphsHTML = state.body.split('\n\n').map(para => {
      return `<p style="margin-bottom: 14px; text-indent: 0px;">${para.replace(/\n/g, '<br>')}</p>`;
    }).join('');
    letterContentDisplay.innerHTML = paragraphsHTML;
    
    // Sign-off (localized sincerely text)
    if (letterClosingText) {
      if (state.language === 'mr') {
        letterClosingText.textContent = 'आपला नम्र / आपली नम्र,';
      } else if (state.language === 'hi') {
        letterClosingText.textContent = 'भवदीय / भवदीया,';
      } else {
        letterClosingText.textContent = 'Sincerely,';
      }
    }
    
    letterSignerName.textContent = state.signerName;
    letterSignerTitle.textContent = state.signerTitle;
    
    // Footer line
    if (state.orgFooter && state.orgFooter.trim() !== "") {
      letterFooterDisplay.textContent = state.orgFooter;
    } else {
      const footerContact = [
        state.orgName,
        state.orgAddress.split('\n')[0],
        state.orgEmail || state.orgPhone
      ].filter(Boolean).join(' • ');
      letterFooterDisplay.textContent = footerContact;
    }
    
    // Render Stamp
    if (state.stampUrl) {
      stampImageElement.src = state.stampUrl;
    } else {
      stampImageElement.src = defaultStampSVG;
    }
    
    // Apply Stamp styles
    draggableStamp.style.width = `${state.stampSize}px`;
    draggableStamp.style.height = `${state.stampSize}px`;
    draggableStamp.style.opacity = state.stampOpacity / 100;
    draggableStamp.style.transform = `rotate(${state.stampRotation}deg)`;
    draggableStamp.style.left = state.stampLeft;
    draggableStamp.style.top = state.stampTop;
  }

  // Bind keyup and change events for real-time live synchronization
  const syncElements = [
    inputRecName, inputRecOrg, inputRecAddress, inputDate,
    inputSubject, inputBody, inputOrgName, inputOrgTagline,
    inputOrgPhone, inputOrgEmail, inputOrgAddress, inputOrgReg, 
    inputOrgFooter, inputSignerName, inputSignerTitle
  ];
  
  syncElements.forEach(elem => {
    elem.addEventListener('input', () => {
      updateStateFromInputs();
      renderPreview();
    });
  });

  // --- FILE HANDLING (LOGO & STAMP UPLOADS) ---
  
  uploadLogo.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        state.logoUrl = evt.target.result;
        // Optionally save standard logo in localStorage for convenience
        localStorage.setItem('letterhead_logo', state.logoUrl);
        renderPreview();
        showToast("Organization logo uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  });

  btnRemoveLogo.addEventListener('click', () => {
    state.logoUrl = "";
    localStorage.removeItem('letterhead_logo');
    uploadLogo.value = '';
    renderPreview();
    showToast("Organization logo removed.");
  });

  uploadStamp.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        state.stampUrl = evt.target.result;
        renderPreview();
        showToast("Organization stamp uploaded!");
      };
      reader.readAsDataURL(file);
    }
  });

  // --- SLIDERS INTERACTION ---
  sliderStampSize.addEventListener('input', (e) => {
    const val = e.target.value;
    valStampSize.textContent = `${val}px`;
    state.stampSize = parseInt(val);
    renderPreview();
  });

  sliderStampRot.addEventListener('input', (e) => {
    const val = e.target.value;
    valStampRot.textContent = `${val}°`;
    state.stampRotation = parseInt(val);
    renderPreview();
  });

  sliderStampOpac.addEventListener('input', (e) => {
    const val = e.target.value;
    valStampOpac.textContent = `${val}%`;
    state.stampOpacity = parseInt(val);
    renderPreview();
  });

  // --- TEMPLATE SELECTION ---
  templateCards.forEach(card => {
    card.addEventListener('click', () => {
      const type = card.getAttribute('data-template');
      const tmpl = templates[state.language][type];
      
      if (tmpl) {
        state.subject = tmpl.subject;
        state.body = tmpl.body;
        state.signerName = tmpl.signerName;
        state.signerTitle = tmpl.signerTitle;
        
        syncStateToInputs();
        renderPreview();
        showToast(`Loaded "${card.querySelector('h4').textContent}" Template!`);
      }
    });
  });

  // Dynamically update the sidebar template cards when language changes
  function updateTemplateCards() {
    const cards = document.querySelectorAll('.template-card');
    const localizations = {
      en: {
        volunteer: { title: "Volunteer Appreciation", desc: "Thanking a volunteer for dedicated time and selfless community service." },
        donor: { title: "Donor & Financial Partner", desc: "Expressing gratitude for substantial funding or material donations." },
        speaker: { title: "Guest Speaker / Mentor", desc: "Appreciating a guest speaker for sharing valuable expertise and advice." }
      },
      mr: {
        volunteer: { title: "स्वयंसेवक आभार पत्र", desc: "स्वयंसेवकाने दिलेल्या निःस्वार्थ सेवा आणि योगदानाबद्दल आभार मानणे." },
        donor: { title: "देणगीदार आभार पत्र", desc: "संस्थेला दिलेल्या आर्थिक किंवा भौतिक देणगीबद्दल कृतज्ञता व्यक्त करणे." },
        speaker: { title: "अतिथी व्याख्याता आभार", desc: "मार्गदर्शन, व्याख्यान आणि अमूल्य विचारांबद्दल आभार मानणे." }
      },
      hi: {
        volunteer: { title: "स्वयंसेवक आभार पत्र", desc: "स्वयंसेवक द्वारा समर्पित समय और निस्वार्थ सेवा के लिए धन्यवाद।" },
        donor: { title: "दाता आभार पत्र", desc: "उदार आर्थिक सहयोग या भौतिक दान के लिए आभार व्यक्त करना।" },
        speaker: { title: "अतिथि वक्ता आभार पत्र", desc: "प्रेरणादायक व्याख्यान और बहुमूल्य मार्गदर्शन के लिए धन्यवाद।" }
      }
    };

    cards.forEach(card => {
      const type = card.getAttribute('data-template');
      const data = localizations[state.language][type];
      if (data) {
        card.querySelector('h4').textContent = data.title;
        card.querySelector('p').textContent = data.desc;
      }
    });
  }

  // Handle language selector changes with smart auto-translation triggers
  if (selectLanguage) {
    selectLanguage.addEventListener('change', (e) => {
      const oldLang = state.language;
      const newLang = e.target.value;
      
      // Auto-translate default/active templates if unmodified or matching standard values
      const oldTemplates = templates[oldLang];
      const oldDefault = defaultContent[oldLang];
      let templateType = null;
      
      if (state.subject === oldDefault.subject && state.body === oldDefault.body) {
        state.subject = defaultContent[newLang].subject;
        state.body = defaultContent[newLang].body;
      } else {
        // Find if they are using one of our pre-configured templates
        for (const [key, tmpl] of Object.entries(oldTemplates)) {
          if (state.subject === tmpl.subject && state.body === tmpl.body) {
            templateType = key;
            break;
          }
        }
        
        if (templateType) {
          const newTmpl = templates[newLang][templateType];
          state.subject = newTmpl.subject;
          state.body = newTmpl.body;
          if (state.signerName === oldTemplates[templateType].signerName) {
            state.signerName = newTmpl.signerName;
          }
          if (state.signerTitle === oldTemplates[templateType].signerTitle) {
            state.signerTitle = newTmpl.signerTitle;
          }
        }
      }
      
      state.language = newLang;
      syncStateToInputs();
      updateTemplateCards();
      renderPreview();
      
      const langName = newLang === 'en' ? 'English' : newLang === 'mr' ? 'Marathi (मराठी)' : 'Hindi (हिंदी)';
      showToast(`Switched Letter Language to ${langName}!`);
    });
  }

  // --- DRAGGABLE & RESIZABLE STAMP MECHANICS ---
  
  function setupDraggableStamp() {
    let isDragging = false;
    let isResizing = false;
    let startX, startY;
    let startWidth, startHeight;
    let offsetLeft = 0;
    let offsetTop = 0;

    // Draggable event
    draggableStamp.addEventListener('mousedown', (e) => {
      // Check if clicking resize handle
      if (e.target === stampResizer) return;
      
      isDragging = true;
      draggableStamp.classList.add('active');
      
      // Calculate initial mouse offset
      const stampRect = draggableStamp.getBoundingClientRect();
      offsetLeft = e.clientX - stampRect.left;
      offsetTop = e.clientY - stampRect.top;
      
      e.preventDefault();
    });

    // Resize event
    stampResizer.addEventListener('mousedown', (e) => {
      isResizing = true;
      draggableStamp.classList.add('active');
      
      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(document.defaultView.getComputedStyle(draggableStamp).width, 10);
      startHeight = parseInt(document.defaultView.getComputedStyle(draggableStamp).height, 10);
      
      e.stopPropagation();
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      const canvasRect = canvasElement.getBoundingClientRect();
      
      if (isDragging) {
        // Calculate new X, Y relative to the Letter Canvas
        const x = e.clientX - canvasRect.left - offsetLeft;
        const y = e.clientY - canvasRect.top - offsetTop;
        
        // Convert to percentage position so it scales on smaller previews
        const pctLeft = (x / canvasRect.width) * 100;
        const pctTop = (y / canvasRect.height) * 100;
        
        // Constrain stamp bounds within A4 page canvas
        const boundX = Math.max(0, Math.min(90, pctLeft));
        const boundY = Math.max(0, Math.min(95, pctTop));
        
        state.stampLeft = `${boundX.toFixed(2)}%`;
        state.stampTop = `${boundY.toFixed(2)}%`;
        
        draggableStamp.style.left = state.stampLeft;
        draggableStamp.style.top = state.stampTop;
      }
      
      if (isResizing) {
        // Resize based on movement
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        // Calculate proportional scale
        const newSize = Math.max(60, Math.min(220, startWidth + deltaX));
        
        state.stampSize = Math.round(newSize);
        sliderStampSize.value = state.stampSize;
        valStampSize.textContent = `${state.stampSize}px`;
        
        draggableStamp.style.width = `${state.stampSize}px`;
        draggableStamp.style.height = `${state.stampSize}px`;
      }
    });

    document.addEventListener('mouseup', () => {
      if (isDragging || isResizing) {
        isDragging = false;
        isResizing = false;
        draggableStamp.classList.remove('active');
      }
    });

    // Touch support for mobile devices
    draggableStamp.addEventListener('touchstart', (e) => {
      if (e.target === stampResizer) return;
      isDragging = true;
      const touch = e.touches[0];
      const stampRect = draggableStamp.getBoundingClientRect();
      offsetLeft = touch.clientX - stampRect.left;
      offsetTop = touch.clientY - stampRect.top;
    });

    stampResizer.addEventListener('touchstart', (e) => {
      isResizing = true;
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      startWidth = parseInt(document.defaultView.getComputedStyle(draggableStamp).width, 10);
      startHeight = parseInt(document.defaultView.getComputedStyle(draggableStamp).height, 10);
      e.stopPropagation();
    });

    document.addEventListener('touchmove', (e) => {
      const canvasRect = canvasElement.getBoundingClientRect();
      const touch = e.touches[0];
      
      if (isDragging) {
        const x = touch.clientX - canvasRect.left - offsetLeft;
        const y = touch.clientY - canvasRect.top - offsetTop;
        
        const pctLeft = (x / canvasRect.width) * 100;
        const pctTop = (y / canvasRect.height) * 100;
        
        const boundX = Math.max(0, Math.min(90, pctLeft));
        const boundY = Math.max(0, Math.min(95, pctTop));
        
        state.stampLeft = `${boundX.toFixed(2)}%`;
        state.stampTop = `${boundY.toFixed(2)}%`;
        
        draggableStamp.style.left = state.stampLeft;
        draggableStamp.style.top = state.stampTop;
      }
      
      if (isResizing) {
        const deltaX = touch.clientX - startX;
        const newSize = Math.max(60, Math.min(220, startWidth + deltaX));
        
        state.stampSize = Math.round(newSize);
        sliderStampSize.value = state.stampSize;
        valStampSize.textContent = `${state.stampSize}px`;
        
        draggableStamp.style.width = `${state.stampSize}px`;
        draggableStamp.style.height = `${state.stampSize}px`;
      }
    });

    document.addEventListener('touchend', () => {
      isDragging = false;
      isResizing = false;
    });
  }

  // --- PERSISTENT HISTORY OPERATIONS ---
  
  function getHistory() {
    const currentUserJson = localStorage.getItem('letterhead_current_user');
    if (!currentUserJson) return [];
    const user = JSON.parse(currentUserJson);
    const list = localStorage.getItem(`history_${user.email}`);
    return list ? JSON.parse(list) : [];
  }

  function saveLetterToHistory() {
    const currentUserJson = localStorage.getItem('letterhead_current_user');
    if (!currentUserJson) {
      showToast("Please Sign In first to save letters to your account!", true);
      
      // Auto open full screen authentication modal popup overlay
      if (authModal) authModal.classList.remove('hidden');
      return;
    }
    
    updateStateFromInputs();
    const history = getHistory();
    
    // Package current letter data
    const newEntry = {
      id: 'letter_' + Date.now(),
      savedAt: new Date().toISOString(),
      ...state
    };
    
    // Add to start of array
    history.unshift(newEntry);
    
    const user = JSON.parse(currentUserJson);
    localStorage.setItem(`history_${user.email}`, JSON.stringify(history));
    
    renderHistory();
    showToast("Letter saved successfully to your account!");
    
    // Open history sidebar automatically so the user can verify
    historySidebar.classList.remove('collapsed');
  }

  function renderHistory() {
    const currentUserJson = localStorage.getItem('letterhead_current_user');
    historyContainer.innerHTML = '';
    
    if (!currentUserJson) {
      historyContainer.innerHTML = `
        <div class="history-logged-out">
          <i data-lucide="lock" style="width: 32px; height: 32px; margin-bottom: 8px;"></i>
          <h4 style="font-weight: 700; color: var(--text-main); margin: 0; font-size: 0.9rem;">Sign In Required</h4>
          <p style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.5; margin: 0;">
            Please Sign In to your account under the Account tab to view and manage your saved letters.
          </p>
        </div>
      `;
      lucide.createIcons();
      return;
    }
    
    const history = getHistory();
    if (history.length === 0) {
      historyContainer.innerHTML = `
        <div class="history-empty">
          <i data-lucide="folder-open"></i>
          <p>No saved letters found in your account. Save a letter from the sidebar to store it here.</p>
        </div>
      `;
      lucide.createIcons();
      return;
    }
    
    history.forEach(item => {
      const card = document.createElement('div');
      card.className = 'history-card';
      
      const parsedDate = new Date(item.savedAt);
      const displayDate = parsedDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      // Excerpt truncation
      const excerpt = item.body && item.body.length > 80 ? item.body.substring(0, 80) + '...' : (item.body || '');
      
      card.innerHTML = `
        <div class="card-header">
          <div class="card-title" title="${item.recipientName || 'Untitled'}">${item.recipientName || 'Untitled'}</div>
          <span class="card-date">${displayDate}</span>
        </div>
        <div class="card-excerpt">${excerpt}</div>
        <div class="card-actions">
          <button class="card-btn load-btn" data-id="${item.id}">
            <i data-lucide="folder-open" style="width:12px; height:12px;"></i> Restore
          </button>
          <button class="card-btn card-btn-danger delete-btn" data-id="${item.id}">
            <i data-lucide="trash-2" style="width:12px; height:12px;"></i> Delete
          </button>
        </div>
      `;
      
      // Add restore event
      card.querySelector('.load-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        restoreHistoryItem(item.id);
      });
      
      // Add delete event
      card.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        deleteHistoryItem(item.id);
      });
      
      historyContainer.appendChild(card);
    });
    
    lucide.createIcons();
  }

  function restoreHistoryItem(id) {
    const history = getHistory();
    const item = history.find(l => l.id === id);
    
    if (item) {
      // Unpack values directly into state
      state = { ...item };
      
      syncStateToInputs();
      renderPreview();
      showToast(`Restored thank-you letter for ${state.recipientName || 'Recipient'}!`);
      
      // Close history sidebar on restore to focus on designing
      historySidebar.classList.add('collapsed');
    }
  }

  function deleteHistoryItem(id) {
    const currentUserJson = localStorage.getItem('letterhead_current_user');
    if (!currentUserJson) return;
    const user = JSON.parse(currentUserJson);
    
    let history = getHistory();
    history = history.filter(l => l.id !== id);
    localStorage.setItem(`history_${user.email}`, JSON.stringify(history));
    renderHistory();
    showToast("Letter deleted from your history.", true);
  }

  // --- LOCAL SECURE USER AUTHENTICATION MECHANISMS (MODAL & DROPDOWN) ---
  
  let authMode = 'signin'; // toggle between 'signin', 'signup', and 'forgot'
  
  function initAuth() {
    // 1. Modal Toggle switch buttons
    if (modalTabSignIn) {
      modalTabSignIn.addEventListener('click', () => {
        setModalAuthMode('signin');
      });
    }
    
    if (modalTabSignUp) {
      modalTabSignUp.addEventListener('click', () => {
        setModalAuthMode('signup');
      });
    }
    
    if (btnForgotPassword) {
      btnForgotPassword.addEventListener('click', (e) => {
        e.preventDefault();
        setModalAuthMode('forgot');
      });
    }
    
    // 2. Form submission handler
    if (modalFormAuth) {
      modalFormAuth.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = modalInputEmail.value.trim().toLowerCase();
        const password = modalInputPassword ? modalInputPassword.value : '';
        const name = modalInputName ? modalInputName.value.trim() : '';
        
        let users = localStorage.getItem('letterhead_users');
        users = users ? JSON.parse(users) : [];
        
        if (authMode === 'signup') {
          // Verify name presence
          if (!name) {
            showToast("Please enter your full name!", true);
            return;
          }
          
          // Verify email uniqueness
          const exists = users.find(u => u.email === email);
          if (exists) {
            showToast("An account with this email already exists!", true);
            return;
          }
          
          // Store user details in local db
          const newUser = { name, email, password };
          users.push(newUser);
          localStorage.setItem('letterhead_users', JSON.stringify(users));
          
          // Log user in automatically
          localStorage.setItem('letterhead_current_user', JSON.stringify({ name, email }));
          
          // Reset forms
          modalInputName.value = "";
          modalInputEmail.value = "";
          modalInputPassword.value = "";
          
          updateAuthUI();
          renderHistory();
          showToast(`Welcome to your workspace, ${name}!`);
        } else if (authMode === 'forgot') {
          // Forgot password email retrieval
          const user = users.find(u => u.email === email);
          if (!user) {
            showToast("No registered account found with this email address!", true);
            return;
          }
          
          // Reveal password elegantly directly inside description block for high usability!
          modalAuthDesc.innerHTML = `<div style="background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); padding: 12px; border-radius: 8px; margin-top: 8px; color: #10b981; font-size: 0.82rem; text-align: left; line-height: 1.4;">
            <i data-lucide="check-circle" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle; margin-right: 4px;"></i>
            <strong>Account Found!</strong> Your password is: <code style="background-color: rgba(255,255,255,0.08); padding: 3px 6px; border-radius: 4px; color: white; font-weight: 700; font-family: monospace;">${user.password}</code>
          </div>`;
          lucide.createIcons();
          showToast("Password retrieved successfully!");
        } else {
          // Sign In check
          const user = users.find(u => u.email === email && u.password === password);
          if (!user) {
            showToast("Incorrect email or password!", true);
            return;
          }
          
          // Log user in
          localStorage.setItem('letterhead_current_user', JSON.stringify({ name: user.name, email: user.email }));
          
          // Reset forms
          modalInputEmail.value = "";
          modalInputPassword.value = "";
          
          updateAuthUI();
          renderHistory();
          showToast(`Welcome back, ${user.name}!`);
        }
      });
    }
    
    // 3. Guest Sign-in Button handler
    if (modalBtnGuest) {
      modalBtnGuest.addEventListener('click', () => {
        // Sign in as secure Local Guest Session
        const guestUser = { name: "Guest User", email: "guest@local" };
        localStorage.setItem('letterhead_current_user', JSON.stringify(guestUser));
        
        // Hide auth modal and reset forms
        if (authModal) authModal.classList.add('hidden');
        modalInputEmail.value = "";
        if (modalInputPassword) modalInputPassword.value = "";
        
        updateAuthUI();
        renderHistory();
        showToast("Logged in as Guest. Welcome!");
      });
    }
    
    // 4. User Menu Dropdown trigger
    if (userMenuTrigger) {
      userMenuTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdownCard.classList.toggle('show');
        userMenuTrigger.classList.toggle('active');
      });
    }
    
    // Close dropdown on click outside
    document.addEventListener('click', (e) => {
      if (userDropdownCard && userDropdownCard.classList.contains('show')) {
        if (!headerUserMenu.contains(e.target)) {
          userDropdownCard.classList.remove('show');
          userMenuTrigger.classList.remove('active');
        }
      }
    });
    
    // 5. Dropdown Sign Out button handler
    if (dropdownBtnSignOut) {
      dropdownBtnSignOut.addEventListener('click', () => {
        localStorage.removeItem('letterhead_current_user');
        userDropdownCard.classList.remove('show');
        userMenuTrigger.classList.remove('active');
        updateAuthUI();
        renderHistory();
        showToast("Signed out successfully.");
      });
    }
    
    // 6. Update initial interface state
    updateAuthUI();
  }
  
  function setModalAuthMode(mode) {
    authMode = mode;
    
    if (mode === 'signin') {
      modalTabSignIn.classList.add('active');
      modalTabSignUp.classList.remove('active');
      
      modalAuthTitle.textContent = "Welcome Back";
      modalAuthDesc.textContent = "Please enter your credentials to access the workspace.";
      
      modalGroupName.style.display = 'none';
      modalInputName.removeAttribute('required');
      
      modalGroupPassword.style.display = 'block';
      modalInputPassword.setAttribute('required', 'true');
      
      modalGuestDivider.style.display = 'flex';
      modalBtnGuest.style.display = 'block';
      
      modalBtnSubmit.innerHTML = `<i data-lucide="log-in" style="width: 16px; height: 16px;"></i> Sign In`;
    } else if (mode === 'signup') {
      modalTabSignUp.classList.add('active');
      modalTabSignIn.classList.remove('active');
      
      modalAuthTitle.textContent = "Create Account";
      modalAuthDesc.textContent = "Sign up for a free local secure workspace.";
      
      modalGroupName.style.display = 'block';
      modalInputName.setAttribute('required', 'true');
      
      modalGroupPassword.style.display = 'block';
      modalInputPassword.setAttribute('required', 'true');
      
      modalGuestDivider.style.display = 'flex';
      modalBtnGuest.style.display = 'block';
      
      modalBtnSubmit.innerHTML = `<i data-lucide="user-plus" style="width: 16px; height: 16px;"></i> Sign Up`;
    } else if (mode === 'forgot') {
      modalTabSignIn.classList.remove('active');
      modalTabSignUp.classList.remove('active');
      
      modalAuthTitle.textContent = "Recover Password";
      modalAuthDesc.textContent = "Please enter your registered email address to retrieve your password.";
      
      modalGroupName.style.display = 'none';
      modalInputName.removeAttribute('required');
      
      modalGroupPassword.style.display = 'none';
      modalInputPassword.removeAttribute('required');
      
      modalGuestDivider.style.display = 'none';
      modalBtnGuest.style.display = 'none';
      
      modalBtnSubmit.innerHTML = `<i data-lucide="help-circle" style="width: 16px; height: 16px;"></i> Retrieve Password`;
    }
    
    lucide.createIcons();
  }
  
  function updateAuthUI() {
    const currentUserJson = localStorage.getItem('letterhead_current_user');
    
    if (currentUserJson) {
      const user = JSON.parse(currentUserJson);
      
      // Hide full-screen authentication popup overlay
      if (authModal) authModal.classList.add('hidden');
      
      // Update User Menu display details
      if (dropdownUserName) dropdownUserName.textContent = user.name;
      if (dropdownUserEmail) dropdownUserEmail.textContent = user.email;
    } else {
      // Show full-screen authentication popup overlay
      if (authModal) authModal.classList.remove('hidden');
      
      // Default modal auth state
      setModalAuthMode('signin');
    }
    
    lucide.createIcons();
  }

  // --- ACTIONS & TOASTS ---
  
  // Show standard toast notifications
  function showToast(message, isWarning = false) {
    toastMessage.textContent = message;
    
    const icon = toastElement.querySelector('i');
    if (isWarning) {
      toastElement.style.borderColor = 'var(--danger)';
      icon.setAttribute('data-lucide', 'alert-circle');
      icon.style.color = 'var(--danger)';
    } else {
      toastElement.style.borderColor = 'var(--accent)';
      icon.setAttribute('data-lucide', 'check-circle-2');
      icon.style.color = 'var(--success)';
    }
    
    lucide.createIcons();
    
    toastElement.classList.add('show');
    
    // Auto hide
    setTimeout(() => {
      toastElement.classList.remove('show');
    }, 3000);
  }

  // Trigger browser A4 vector print or save as PDF
  btnPrint.addEventListener('click', () => {
    // Sync state one last time to ensure absolute fidelity
    updateStateFromInputs();
    renderPreview();
    
    // Trigger Native Dialog
    window.print();
  });

  // Save to history trigger
  btnSaveDocument.addEventListener('click', () => {
    saveLetterToHistory();
  });

  // Toggle History Sidebar
  btnToggleHistory.addEventListener('click', () => {
    historySidebar.classList.toggle('collapsed');
  });

  btnCloseHistory.addEventListener('click', () => {
    historySidebar.classList.add('collapsed');
  });

  // Reset form
  btnClear.addEventListener('click', () => {
    if (confirm("Are you sure you want to reset the form? This will clear recipient and content inputs.")) {
      // Keep Org details but wipe current letter specifics
      state.recipientName = "";
      state.recipientOrg = "";
      state.recipientAddress = "";
      
      const today = new Date();
      state.letterDate = today.toISOString().split('T')[0];
      
      state.subject = "";
      state.body = "";
      
      // Default stamp settings
      state.stampSize = 110;
      state.stampRotation = -5;
      state.stampOpacity = 90;
      state.stampLeft = "70%";
      state.stampTop = "75%";
      state.stampUrl = "imgs/DNCT Stamp.png";
      state.logoUrl = "imgs/Logo wide.png";
      
      syncStateToInputs();
      renderPreview();
      showToast("Form fields reset.");
    }
  });

  // --- MOBILE RESPONSIVENESS AND AUTO-SCALING ---
  
  function initMobileResponsiveness() {
    const btnModeEditor = document.getElementById('btn-mode-editor');
    const btnModePreview = document.getElementById('btn-mode-preview');
    const sidebar = document.querySelector('.sidebar');
    const canvasWrapper = document.querySelector('.canvas-wrapper');
    
    // Switch to editor panel on mobile
    if (btnModeEditor) {
      btnModeEditor.addEventListener('click', () => {
        btnModeEditor.classList.add('active');
        if (btnModePreview) btnModePreview.classList.remove('active');
        
        sidebar.classList.remove('hidden-mobile');
        canvasWrapper.classList.remove('active-mobile');
      });
    }
    
    // Switch to A4 canvas preview panel on mobile
    if (btnModePreview) {
      btnModePreview.addEventListener('click', () => {
        btnModePreview.classList.add('active');
        if (btnModeEditor) btnModeEditor.classList.remove('active');
        
        sidebar.classList.add('hidden-mobile');
        canvasWrapper.classList.add('active-mobile');
        
        // Always trigger scale refresh
        adjustCanvasScale();
      });
    }
    
    // Quick-action Mobile Print trigger
    const btnModePrint = document.getElementById('btn-mode-print');
    if (btnModePrint) {
      btnModePrint.addEventListener('click', () => {
        const desktopPrintBtn = document.getElementById('btn-print');
        if (desktopPrintBtn) desktopPrintBtn.click();
      });
    }
    
    // Listen for window resizes
    window.addEventListener('resize', adjustCanvasScale);
    
    // Run once on load to fit document instantly
    adjustCanvasScale();
  }
  
  function adjustCanvasScale() {
    const wrapper = document.querySelector('.canvas-wrapper');
    const canvas = document.querySelector('.letter-canvas');
    if (!wrapper || !canvas) return;
    
    const wrapperWidth = wrapper.clientWidth - 24; // 12px padding each side
    const canvasWidth = 794; // A4 standard pixel width
    
    if (window.innerWidth < 1025) {
      // Fluid zoom scaling to guarantee perfect fit on any smartphone/tablet width!
      const scale = wrapperWidth / canvasWidth;
      const minScale = Math.min(1, scale);
      
      canvas.style.transform = `scale(${minScale})`;
      canvas.style.transformOrigin = 'center top';
      
      // Compensate height for page flow layout spacing
      const scaledHeight = 1123 * minScale; // A4 approx height
      wrapper.style.minHeight = `${scaledHeight + 40}px`;
    } else {
      // Reset desktop styles completely
      canvas.style.transform = '';
      canvas.style.transformOrigin = '';
      wrapper.style.minHeight = '';
    }
  }

  // --- INITIALIZE RUN ---
  init();
});
