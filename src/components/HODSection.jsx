import React from "react";
import HODCard from "./HODCard.jsx";

// Import HOD images
import hodBusiness from "../assets/images/HODs/Dr. Muhammad Danish Habib.png";
import hodCS from "../assets/images/HODs/Dr. M. Saud Khan.jpeg";
import hodEE from "../assets/images/HODs/Dr.Qasim Ali.jpeg";
import hodME from "../assets/images/HODs/Dr. Muhammad Abdul Ahad.jpeg";

const hodData = [
  {
    department: "Department of Business Administration",
    hodName: "Dr. Muhammad Danish Habib",
    image: hodBusiness,
    officialLink: "https://aack.au.edu.pk/Pages/Departments/Business_Administration/dba_hod_msg.aspx",
    message: `At the Department of Business Administration, we nurture thinkers, innovators, and leaders who shape the future of business and society. Our programs—BBA, BS Aviation Management, BS FinTech, BS Business and Information Technology, BS Business Analytics, and MS programs—blend academic rigor with real-world application, empowering students to transform ideas into impact. We believe in learning by doing. Through case studies, research, and collaboration with industry, our students gain the skills, confidence, and vision to excel in a rapidly changing world. Guided by a dedicated faculty and a spirit of curiosity, we cultivate not just professionals but responsible leaders ready to make a difference. Join us in redefining business education—where knowledge meets innovation, and ambition becomes achievement.`
  },
  {
    department: "Department of Computer Science",
    hodName: "Dr. M. Saud Khan",
    image: hodCS,
    officialLink: "https://aack.au.edu.pk/Pages/Departments/Computer_Science/cs_hod_msg.aspx",
    message: `Welcome to the Department of Computer Science at Air University-Aerospace and Aviation Campus, Kamra!
Computers and related technologies are more ubiquitous than ever before, and indispensable to many aspects of human prosperity and well-being. Since its inception, Computer Science has remained a dynamic and promising field with rapid expansion development over the years. As one of the most vibrant fields of study of the 20th century and beyond, computer science continues to provide opportunities for creativity and innovation. Moreover, the initial two decades of 21st century have witnessed unprecedented growth of the internet due to mobile phones and other wirelessly connected devices. Hence, companies and banks shifted their business online to provide better services to customers. However, the situation brings new challenges in terms of protection and security of digital assets against hackers and cybercrime.
The Department of Computer Science was established with a vision to provide quality education in the field of Computer Science and Cybersecurity. The department aims to provide a conducive environment that gives students the opportunity to develop a broad range of practical skills and understanding of modern technologies essential for survival and growth in such a dynamic field as computer science and cybersecurity. Therefore, our curricula reflect a balanced blend of strong theoretical foundation and relevant practical skills.
The curricula covered a wide range of courses to divulge in-depth knowledge and skill that groom our students for the challenges of today’s market and play a vital role in the development of the nation. Recently, the department has introduced Outcome-Based Education (OBE) as a more systematic and student-centered approach to learning.
Highly qualified, experienced and committed faculty is our core strength. Our diverse faculty has academic and research expertise in artificial intelligence, machine learning, blockchain technology, software engineering, information security, network security and digital forensics. The faculty strives to produce competent professionals who have sound knowledge, practical skills as well as moral values.
If you are looking to pursue your professional ambitions in the most exciting and dynamic discipline of human history, then the Department of Computer Science at Air University, Kamra is the right place for you to begin your journey.
I am excited and looking forward to welcome you to our new purpose-built campus with state-of-the-art classrooms, computing labs, hostel and sports facilities.`
  },
  {
    department: "Department of Electrical & Avionics Engineering",
    hodName: "Dr. Qasim Ali",
    image: hodEE,
    officialLink: "https://aack.au.edu.pk/Pages/Departments/Elec-Avionics_Engg/HOD%E2%80%99s%20Message.aspx",
    message: `It is my pleasure to warmly welcome you on behalf of the faculty to the Department of Electrical and Avionics Engineering at Air University Aerospace and Aviation Campus, Kamra.
In today’s rapidly evolving world, only those with a passion to excel can truly thrive. Our department is committed to providing high-quality engineering education with a strong focus on research, innovation, and practical application. We aim to prepare engineers and researchers capable of understanding, identifying, and solving complex problems in both electrical, computer, and avionics domains, ranging from energy and communication systems to aerospace and defense technologies at both national and global levels.
Our greatest strength lies in our highly qualified and dedicated faculty, whose impressive academic and research credentials are matched by their commitment to the personal and professional growth of our students. This dedication makes our programs distinctive, nurturing graduates who are technically proficient, innovative, and ready to take on real-world challenges.
To expose our students to the latest industry trends, we actively collaborate with leading organizations such as the Pakistan Aeronautical Complex (PAC) Kamra and the National Aerospace Science and Technology Park (NASTP). Through internships, joint research projects, and exchange opportunities, our students gain invaluable hands-on experience and insight into cutting-edge advancements in electrical, computer, avionics, and aerospace technologies.
Beyond professional and technical knowledge, we emphasize the holistic development of our students. They are trained to be effective communicators, problem solvers, life-long learners, and leaders with a global vision. Throughout the year, the department organizes seminars, workshops, internships, and industrial visits to enrich both their technical and soft skills.
I am excited to welcome you to the Department of Electrical and Avionics Engineering and look forward to witnessing your transformation into an engineering leader equipped with modern knowledge, practical expertise, and the vision to address the complex challenges of the future.`
  },
  {
    department: "Department of Mechanical & Aerospace Engineering",
    hodName: "Dr. Muhammad Abdul Ahad",
    image: hodME,
    officialLink: "https://aack.au.edu.pk/Pages/Departments/Mech_Aero_Engg/HOD%E2%80%99s%20Message.aspx",
    message: `It is a privilege and honor to lead the Department of Mechanical and Aerospace Engineering (DMAE) at Air University’s Aerospace and Aviation Campus Kamra , an institution dedicated to shaping the future of engineering through high-quality education, applied research, and industry-aligned learning.
The department offers a forward-looking curriculum, designed in consultation with experienced academic and industry professionals. It spans core mechanical engineering disciplines such as system dynamics and control, thermo-fluids, design, and manufacturing.
We are currently offering Bachelor of Engineering (BE) in Mechanical Engineering, MS in Mechanical Engineering, MS in Aerospace Engineering , and PhD in Mechanical Engineering . All our programs are approved by the Higher Education Commission (HEC) and the Pakistan Engineering Council (PEC) . Notably, our BE Mechanical Engineering program is accredited by PEC under the Outcome-Based Education (OBE) framework.
Our greatest strength lies in our highly qualified and dedicated faculty . Their commitment to academic excellence, research, and student development drives the department’s reputation for producing competent, industry-ready graduates.
We place a strong emphasis on experiential learning. Through internships, industrial visits, and hands- on training, our students engage directly with Pakistan’s aerospace sector including the Pakistan Aeronautical Complex (PAC) Kamra and the National Aerospace Science and Technology Park (NASTP), as well as other national enterprises.
At DMAE, we are proud to foster an environment of innovation, mentorship, and intellectual growth . We believe in nurturing not only skilled engineers but also responsible professionals and informed citizens.
On behalf of the DMAE team, I welcome all prospective students and collaborators to be part of a challenging, inspiring, and deeply rewarding journey.
Dr. Muhammad Abdul Ahad , Chair, Department of Mechanical and Aerospace Engineering, Air University Aerospace and Aviation Campus Kamra.`
  }
];

export default function HODSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent mb-4 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Heads of Departments
          </h2>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto font-medium">
            Academic Leadership at Air University Aerospace & Aviation Campus, Kamra
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {hodData.map((hod, index) => (
            <HODCard key={index} hod={hod} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
