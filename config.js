/* =====================================================
   CGA SITE SETTINGS: THIS IS THE ONLY FILE YOU NEED TO EDIT
   Change the text between the quotation marks "like this",
   save, and upload the folder to Netlify again.
   ===================================================== */
const CGA_CONFIG = {
  classStartDate: "2027-01-05T00:00:00+01:00", // Africa/Lagos (WAT)
  address: "Block C3 Iba Housing Estate Market Square Complex, Iba, Ojo, Lagos",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.2346905654063!2d3.197716!3d6.491939899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b852171ed5ed7%3A0x9f74c15d37abb90f!2sCareers%20Gateway%20Academy!5e0!3m2!1sen!2sng!4v1790623804133!5m2!1sen!2sng", // paste the src from Google Maps > Share > Embed a map
  whatsapp: "+234 911 3668 905",  // digits with country code, e.g. 234XXXXXXXXXX
  phone: "+234 911 3668 905",
  email: "careersgatewayacademy@gmail.com",
  schedule: "Book Now",
  // PHOTOS: put image files in assets/images/ and type the file name here.
  // Leave "" (empty) if you have no photo yet. The site still looks complete.
  photos: {
    hero: "",                      // e.g. "assets/images/hero.jpg"
    about: "",                     // e.g. "assets/images/students.jpg"
    oit: "assets/images/oit.jpg"   // Othello students photo (clear "" if you don't have OIT's permission)
  },
  // SOCIAL LINKS: paste full links, or leave "" to hide.
  social: { instagram: "", facebook: "", tiktok: "", x: "" },
  formEndpoint: "", // optional: Formspree/Netlify/your API URL. Empty = registration opens WhatsApp
  programmes: [
    {icon:"🎓", name:"JAMB / UTME Preparation", text:"Structured preparation for students preparing for JAMB/UTME."},
    {icon:"💻", name:"CBT Preparation", text:"Practical computer-based examination preparation designed to improve familiarity, speed, confidence and exam readiness."},
    {icon:"📘", name:"Academic Tutorials", text:"Structured tutorial support to help students strengthen understanding of relevant subjects and prepare effectively."},
    {icon:"🖥️", name:"Computer-Based Learning", text:"Practical exposure to computer-based learning environments and examination interfaces."}
  ],
  why: [
    ["🧭","Structured Preparation","A clear plan for how students prepare, practise and improve."],
    ["⏱️","Practical CBT Experience","Regular practice on computers builds speed and familiarity."],
    ["🎯","Student-Focused Learning","Guidance shaped around what each student needs."],
    ["🤝","Academic Support","Tutorial help to strengthen understanding of your subjects."],
    ["🏫","Modern Learning Environment","Computer-based learning in a practical setting."],
    ["📍","Convenient Local Access","Serving students in Ojo, Iba and nearby Lagos communities."]
  ],
  faqs: [
    ["What is Careers Gateway Academy?","CGA is an academic and examination-preparation academy in Ojo, Lagos offering tutorials, JAMB/UTME preparation and CBT practice."],
    ["Do you prepare students for JAMB/UTME?","Yes. We offer structured JAMB/UTME preparation including CBT-style practice and guided support."],
    ["Do you offer CBT practice?","Yes. Students practise in computer-based, timed conditions so the exam format feels familiar."],
    ["Who can join?","Students preparing for JAMB/UTME or other examinations, and students who need extra tutorial support."],
    ["Where is CGA located?","We are in Ojo, Lagos, Nigeria. See the map on this page for directions."],
    ["How do I register?","Use the registration form on this page or message us on WhatsApp."],
    ["Can parents contact the academy?","Yes. Parents and guardians are welcome to call or message us with questions."],
    ["Does CGA provide computer-based learning?","Yes. Through our collaboration with Othello Institute of Technology, students access practical computer facilities where appropriate."],
    ["What programmes are currently available?","JAMB/UTME Preparation, CBT Preparation, Academic Tutorials and Computer-Based Learning. Contact us for subjects, fees and schedules."],
    ["How can I contact CGA on WhatsApp?","Tap any WhatsApp button on this page to start a chat with our team."]
  ],
  demoQuestions: [
    {q:"Sample question 1: Which of these is a computer input device?", o:["Keyboard","Monitor","Speaker","Printer"]},
    {q:"Sample question 2: What does CBT stand for?", o:["Computer-Based Test","Central Board Test","Class Book Test","Core Basic Training"]},
    {q:"Sample question 3: Best way to manage exam time?", o:["Spend all time on one question","Skip and return to hard questions","Guess without reading","Leave early"]}
  ]
};
/* Nothing below needs editing. */
