import React, { useState, useEffect } from 'react';

// --- Typen ---
type View = 'home' | 'impressum' | 'datenschutz' | 'ueber-uns' | 'dokumenten-verwaltung';

interface Qualifikation {
  institution: string;
  abschluss: string;
}

interface TeamMember {
  name: string;
  suffix?: string;
  qualifikationen: string | Qualifikation[];
  imageUrl: string;
  linkedinUrl?: string;
}

interface ExpertiseItem {
  text: string;
  link?: string;
}

interface ExpertiseField {
  title: string;
  text?: string;
  items?: ExpertiseItem[];
  ctaImage?: string;
  ctaLink?: string;
  isHighlight?: boolean;
  footerLink?: { text: string; url: string };
}

interface ServiceItem {
  title: string;
  detailsUrl?: string;
}

// --- Hilfsfunktionen ---

const openUploadPopup = () => {
  const width = 1024;
  const height = 768;
  const left = (window.screen.width / 2) - (width / 2);
  const top = (window.screen.height / 2) - (height / 2);
  
  const popup = window.open(
    'https://webportal.teamdrive.net/',
    'TeamDriveUpload',
    `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
  );
  if (popup) popup.focus();
};

const openDetailsPopup = (url: string) => {
  // Berechnet eine Größe, die um 75 % reduziert ist (entspricht 25 % der Originalgröße)
  const width = window.screen.availWidth * 0.25;
  const height = window.screen.availHeight * 0.25;
  
  // Zentriert das Fenster auf dem Bildschirm
  const left = (window.screen.availWidth / 2) - (width / 2);
  const top = (window.screen.availHeight / 2) - (height / 2);
  
  const popup = window.open(
    url,
    'ServiceDetails',
    `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
  );
  if (popup) popup.focus();
};

// --- Komponenten ---

const HeaderButtons = ({ setView }: { setView: (v: View) => void }) => (
  <div className="absolute top-6 right-6 flex gap-4 z-50">
    <button 
      onClick={() => { setView('ueber-uns'); window.scrollTo(0,0); }}
      className="px-5 py-2 text-sm font-semibold bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/50 rounded-full backdrop-blur-md transition-all text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
    >
      Über uns
    </button>
    <button 
      onClick={() => { setView('dokumenten-verwaltung'); window.scrollTo(0,0); }}
      className="px-5 py-2 text-sm font-semibold bg-white/10 hover:bg-white/20 border border-white/20 rounded-full backdrop-blur-md transition-all text-white"
    >
      Datei-Transfair
    </button>
  </div>
);

const Hero = ({ onOpenContact }: { onOpenContact: () => void }) => (
  <section className="relative h-screen w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden">
    {/* Hintergrundbild Rosenheim */}
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale brightness-[0.5]"
      style={{ backgroundImage: `url('https://www.chiemgau.de/files/ausflugsziele/rosenheim_bild19_600px.jpg')` }}
    />
    {/* Overlay für Kontrast */}
    <div className="absolute inset-0 bg-slate-950/40" />

    <div className="relative z-10 max-w-5xl space-y-8">
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-4 animate-fade-in text-glow">
        Kiefer <span className="text-blue-500">&</span> Kollegen
      </h1>
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-blue-400">
          Sachverständige für Immobilienbewertung & -beratung
        </h2>
        <h3 className="text-sm md:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
          von der Industrie- & Handelskammer für München & Oberbayern öffentlich bestellt und vereidigt
        </h3>
      </div>
      
      <div className="pt-10 flex flex-col items-center">
        <button 
          onClick={onOpenContact}
          className="px-20 py-8 text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-full shadow-[0_0_50px_rgba(59,130,246,0.4)] transform transition hover:scale-105 active:scale-95 text-white tracking-wide"
        >
          Kontakt
        </button>
      </div>
    </div>
  </section>
);

const ModalOverlay = ({ isOpen, onClose, title, url }: { isOpen: boolean, onClose: () => void, title: string, url: string }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />
      
      {/* Container - Verkleinert um 25% (w-3/4 h-3/4) */}
      <div className="relative w-3/4 h-3/4 max-w-4xl bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </span>
            {title}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content (Iframe) */}
        <div className="flex-1 w-full bg-white relative">
          <iframe 
            src={url} 
            className="w-full h-full border-none"
            title={title}
          />
        </div>
      </div>
    </div>
  );
};

interface ServiceCardProps {
  title: string;
  detailsUrl?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, detailsUrl }) => (
  <div className="bg-slate-900/30 border border-slate-800/50 p-7 md:p-9 rounded-[2rem] backdrop-blur-md flex flex-col h-full hover:border-blue-500/50 hover:bg-slate-900/50 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
    {/* Subtiler Background-Glow */}
    <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/5 blur-[80px] group-hover:bg-blue-600/10 transition-all duration-500 rounded-full" />
    
    <div className="relative z-10 flex flex-col h-full">
      {/* Indikator-Icon/Linie */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500/80">Expertise</span>
      </div>
      
      <h4 className="text-xl md:text-2xl font-bold text-white mb-10 group-hover:text-blue-300 transition-colors leading-[1.3] [hyphens:auto] [word-break:break-word] tracking-tight">
        {title}
      </h4>
      
      <div className="mt-auto pt-6 border-t border-slate-800/50 flex flex-col sm:flex-row gap-3">
        <button 
          onClick={() => detailsUrl && openDetailsPopup(detailsUrl)}
          className={`flex-1 py-3 px-4 text-[11px] font-bold uppercase tracking-wider rounded-xl border border-white/5 transition-all ${detailsUrl ? 'bg-white/15 hover:bg-white/25 text-white shadow-lg shadow-white/5 cursor-pointer' : 'bg-white/5 text-slate-500 cursor-not-allowed opacity-40'}`}
        >
          Info
        </button>
        <button className="flex-1 py-3 px-4 text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white rounded-xl shadow-lg shadow-blue-900/20 transition-all">
          Anfragen
        </button>
      </div>
    </div>
  </div>
);

interface ToolCardProps {
  title: string;
  icon: React.ReactNode;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, icon }) => (
  <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 md:p-8 rounded-3xl flex flex-col h-full hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:border-sky-500/30 transition-all duration-300 group">
    <div className="w-12 h-12 rounded-2xl bg-sky-600/10 flex items-center justify-center mb-6 border border-sky-500/20 group-hover:bg-sky-600 group-hover:text-white transition-all text-sky-400">
      {icon}
    </div>
    <h4 className="text-lg font-bold text-white mb-6 leading-snug whitespace-pre-line">
      {title}
    </h4>
    <div className="mt-auto space-y-3">
      <button className="w-full py-3 px-4 text-[10px] font-bold uppercase tracking-widest bg-sky-600/10 hover:bg-sky-600/20 text-sky-300 rounded-xl border border-sky-500/20 transition-all">
        Mehr erfahren
      </button>
      <button className="w-full py-3 px-4 text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r from-sky-400 to-blue-600 hover:opacity-90 text-white rounded-xl shadow-lg transition-all">
        Zum Tool
      </button>
    </div>
  </div>
);

const Footer = ({ setView }: { setView: (v: View) => void }) => (
  <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        <div>
          <h5 className="text-xl font-bold text-white mb-6">Wie Sie uns finden</h5>
          <p className="text-slate-400 leading-relaxed">
            Max Josefs Platz 2<br />
            83022 Rosenheim<br />
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=Max+Josefs+Platz+2,+83022+Rosenheim" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 transition-colors inline-flex items-center gap-1 mt-2"
            >
              Anfahrt planen
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </p>
        </div>
        <div>
          <h5 className="text-xl font-bold text-white mb-6">Rechtliches</h5>
          <ul className="space-y-3 text-slate-400">
            <li>
              <button 
                onClick={() => { setView('impressum'); window.scrollTo(0,0); }}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                Impressum
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setView('datenschutz'); window.scrollTo(0,0); }}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                Datenschutz
              </button>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-xl font-bold text-white mb-6">Kontakt</h5>
          <p className="text-slate-400 leading-relaxed">
            T: +49 (0) 8031 61626-0<br />
            E: info@svkiefer.de
          </p>
        </div>
      </div>
      <div className="text-center text-slate-600 text-xs border-t border-slate-900 pt-10 tracking-widest uppercase">
        &copy; {new Date().getFullYear()} Kiefer <span className="text-blue-500/80">&</span> Kollegen. Alle Rechte vorbehalten.
      </div>
    </div>
  </footer>
);

// --- Inhaltsseiten ---

const DokumentenVerwaltungPage = ({ setView }: { setView: (v: View) => void }) => (
  <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
    <button 
      onClick={() => setView('home')}
      className="mb-12 flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-semibold"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Zurück zur Startseite
    </button>
    
    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-10 text-glow">Sicherer Daten-Transfair</h1>
    
    <div className="space-y-12 text-slate-300 leading-relaxed text-lg">
      {/* Roter Warnhinweis */}
      <div className="bg-red-950/30 border border-red-500/50 p-6 rounded-2xl flex items-start gap-4 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
        <div className="text-red-500 mt-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <p className="text-red-400 font-bold">
            Schicken Sie uns keine Dateien per EMail! Nutzen Sie unser sicheres UpLoad-Tool. Ganz einfach per Drag & Drop.
          </p>
        </div>
      </div>

      <p>
        Den meisten Menschen ist nicht bewusst, wie unsicher der Versand von sensiblen Informationen und Unterlagen per EMail ist. Mit dem Versand von Dokumenten als Anlage zu einer Email  sind Ihre Daten faktisch ungeschützt!
      </p>
      
      <p>
        Als öffentlich bestellte und vereidigter Sachverständige sind wir in besonderen Weise dem Datenschutz verpflichtet.
      </p>
      
      <p>
        Als unser Mandant haben Sie ein berechtigtes Interesse daran,  dass wir mit Ihr Daten und Informationen maximal sensibel und vorsichtig umgehen.
      </p>
      
      <div className="bg-blue-900/20 border border-blue-500/30 p-10 rounded-3xl mt-12 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-8">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        
        <p className="text-slate-100 mb-10">
          Nutzen Sie deshalb unser gesichertes Tool mir dem Sie uns Ihre Dateien sicher und einfach zur Verfügung stellen können:
        </p>
        
        <button 
          onClick={openUploadPopup}
          className="inline-block px-12 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-900/40 transition-all transform hover:scale-105 active:scale-95"
        >
          Dokumenten-UpLoad starten
        </button>
      </div>
    </div>
  </div>
);

const UeberUnsPage = ({ setView }: { setView: (v: View) => void }) => {
  const teamMembers: TeamMember[] = [
    { 
      name: "Michael Kiefer", 
      suffix: "frics",
      linkedinUrl: "https://www.linkedin.com/in/michael-kiefer-frics-04a87325/",
      qualifikationen: [
        { 
          institution: "Hochschule für Wirtschaft, Zürich", 
          abschluss: "Master of Real Estate Management (MREM), Immobilienwirtschaft" 
        },
        { 
          institution: "DIA Deutsche Immobilienakademie an der Universität Freiburg, Freiburg", 
          abschluss: "Dipl. Sachverständiger für Immobilienbewertung (DIA), Immobilienbewertung" 
        },
        { 
          institution: "EBS Universität für Wirtschaft & Recht, Berlin", 
          abschluss: "Immobilienökonom (EBS), Immobilienwirtschaft" 
        },
        { 
          institution: "Akademie der Industrie- & Handelskammer, München", 
          abschluss: "Energiemanager (IHK), Energieberatung" 
        }
      ],
      imageUrl: "https://www.svkiefer.de/include/img/team/Michael_Kiefer_Sachverstaendiger_Immobilienbewertung.jpg"
    },
    { 
      name: "Luisa Junge", 
      linkedinUrl: "https://www.linkedin.com/in/luisa-maria-junge-8a8809290/",
      qualifikationen: [
        { 
          institution: "DIA Deutsche Immobilienakademie an der Universität Freiburg, Freiburg", 
          abschluss: "Dipl. Sachverständige für Immobilienbewertung (DIA), Immobilienwirtschaft" 
        },
        { 
          institution: "IU International University of Applied Sciences, München", 
          abschluss: "Bachelor of Arts (B.A.), Immobilienwirtschaft" 
        }
      ],
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=600"
    },
    { 
      name: "Unser Team", 
      qualifikationen: "Unser Team besteht aus qualifizierten Gutachtern und hervorragend ausgebildeten Fachkräften mit langjähriger Berufserfahrung.",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600&h=600"
    }
  ];

  const expertiseFields: ExpertiseField[] = [
    { 
      title: "Öffentliche Bestellung und Vereidigung", 
      text: "Die öffentliche Bestellung und Vereidigung ist ein staatlich geschütztes Gütesiegel, das eine überdurchschnittliche fachliche Expertise bescheinigt. Michael Kiefer wurde von der IHK für München und Oberbayern nach einem anspruchsvollen Prüvungsverfahren für das Fachgebiet der Immobilienbewertung berufen.\n\nEin Kernaspekt dieser Bestellung ist die absolute Neutralität und Objektivität. Als öffentlich bestellter und vereidigter Sachverständiger ist er gesetzlich dazu verpflichtet, Gutachten unparteiisch and nach bestem Wissen und Gewissen zu erstellen, was ein Höchstmaß an Verlässlichkeit garantiert.\n\nDie von uns erstellten Gutachten genießen bei Gerichten, Finanzämtern und Kreditinstituten eine besondere Glaubwürdigkeit. Sie bilden die rechtssichere Grundlage für Erbschaftsangelegenheiten, steuerliche Bewertungen oder gerichtliche Auseinandersetzungen.\n\nUm diesen hohen Standard dauerhaft zu sichern, unterliegen wir einer ständigen Aufsicht durch die Bestellungskörperschaft. Dies umfasst die regelmäßige Überprüfung der Gutachtenqualität sowie die Verpflichtung zu kontinuierlicher fachlicher Weiterbildung.",
      ctaImage: "https://svv.ihk.de/blueprint/servlet/resource/crblob/5972434/2859fbc4e02a16c35663e5a6173c6c21/logo-svw-ohne-logos-data.png",
      ctaLink: "https://svv.ihk.de/svw-suche/4931566/suche-extern"
    },
    { 
      title: "Mitgliedschaften", 
      items: [
        { text: "Michael Kiefer ist langjähriges Mitglied im Gutachterausschuss für Grundstückswerte im Landratsamt Rosenheim", link: "https://www.landkreis-rosenheim.de/bauen/" },
        { text: "Michael Kiefer ist langjähriges Mitglied im Gutachterausschuss für Grundstückswerte in der kreisfeien Stadt Rosenheim", link: "https://www.rosenheim.de/buergerservice/planen-bauen/gutachterausschuss-aufgaben-befugnisse/" },
        { text: "Michael Kiefer ist langjährige Mitglied im Umlegungsausschuss der kreisfreien Stadt Rosenheim", link: "https://www.rosenheim.de/buergerservice/planen-bauen/umlegungsausschuss/" },
        { text: "Wir sind Mitglied im Landesverband Bayern öffentlich bestellter und vereidigter Sachverständiger (LVS Bayern e.V.)", link: "https://www.lvs-bayern.de/verzeichnis/" }
      ]
    },
    { 
      title: "Spezialgebiete", 
      items: [
        { text: "Bewertung von Beherbergungs- & Gastronomieimmobilien" },
        { text: "Bewertung von Sozialimmobillien (Alten- und Pflegeheime)" },
        { text: "Bewertung von Krankenhaus-Immobilien" },
        { text: "Bewertung von Immobilien der Landwirtschaft (Hofstellen, Grünland, Ackerflächen, Unland)" },
        { text: "Bewertung von Immobilien der öffenlichen Hand" },
        { text: "Bewertung von Nichtbauland (Begünstigtes Agrarland, Bauerwartungsland)" },
        { text: "Bewertung von Bauerwartungsland nach der Residualwert-Methode (Bauträgerkalkulation)" },
        { text: "Bewertung von betrieblichen Immobilien (Produktion, Industrie, Logistik)" },
        { text: "Portfoliobewertung" }
      ]
    },
    { 
      title: "Aus- und Weiterbildung", 
      isHighlight: true,
      text: "Qualitätssicherung durch lebenslanges Lernen:\n\nUnsere Gutachter unterliegen aufgrund ihrer Mitgliedschaften and Bestellungen einer strengen, kontinuierlichen Weiterbildungsverpflichtung.\n\nDurch regelmäßige interne Schulungen sowie hochkarätige externer Weiterbildung garantieren wir Ergebnisse auf höchstem fachlichem Niveau – stets aktuell, rechtssicher and am Puls der Marktentwicklung (Lifelong Learning).",
      footerLink: { text: "Wir bilden aus", url: "https://www.immokaufleute.de/" }
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <button 
        onClick={() => setView('home')}
        className="mb-12 flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors font-semibold"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Zurück zur Startseite
      </button>
      
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 text-glow">Über uns</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">Expertise, Vertrauen und Unabhängigkeit in der Immobilienbewertung.</p>
      </div>

      {/* Team Sektion */}
      <div className="flex flex-col gap-24 mb-24">
        {teamMembers.map((member, idx) => (
          <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} bg-slate-900/40 border border-slate-800/60 rounded-[3rem] overflow-hidden backdrop-blur-md shadow-2xl`}>
            {/* Bildbereich */}
            <div className="lg:w-1/3 relative min-h-[400px]">
              <img 
                src={member.imageUrl} 
                alt={member.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110 grayscale hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            </div>
            
            {/* Inhaltsbereich */}
            <div className="lg:w-2/3 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
                <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight flex items-baseline gap-3">
                  {member.name} 
                  {member.suffix && (
                    <span className="text-[0.4em] font-medium lowercase text-blue-400/80 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
                      {member.suffix}
                    </span>
                  )}
                </h3>
                
                {member.linkedinUrl && (
                  <a 
                    href={member.linkedinUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group/ln flex items-center justify-center w-12 h-12 bg-[#0077b5]/10 hover:bg-[#0077b5] border border-[#0077b5]/30 rounded-xl transition-all duration-300"
                    title="LinkedIn Profil"
                  >
                    <svg className="w-6 h-6 fill-[#0077b5] group-hover/ln:fill-white transition-colors" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                )}
              </div>
              
              <div className="w-full">
                <h4 className="text-xs font-bold text-blue-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                  Qualifikationen
                  <div className="flex-1 h-px bg-slate-800" />
                </h4>
                
                {Array.isArray(member.qualifikationen) ? (
                  /* Spezial-Layout für Array-Qualifikationen (Kacheln) */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {member.qualifikationen.map((q, qIdx) => (
                      <div key={qIdx} className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl hover:border-blue-500/40 transition-all group flex flex-col gap-2 shadow-inner">
                        <div className="w-6 h-1 bg-blue-600 rounded-full group-hover:w-12 transition-all" />
                        <h5 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                          {q.institution}
                        </h5>
                        <p className="text-xs text-slate-400 leading-relaxed italic">
                          {q.abschluss}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Standard-Layout für Fließtext */
                  <div className="bg-slate-950/60 rounded-3xl p-8 border border-slate-800 shadow-inner">
                    <p className="text-slate-300 leading-relaxed text-base md:text-lg italic">
                      {member.qualifikationen}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-24" />

      {/* Expertise Sektion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {expertiseFields.map((field, idx) => (
          <div key={idx} className={`bg-slate-900/30 border ${field.isHighlight ? 'border-blue-900/40 bg-blue-900/5' : 'border-slate-800/60'} p-10 rounded-3xl hover:border-blue-500/30 transition-all group relative overflow-hidden`}>
            {field.isHighlight && (
              <div className="absolute top-0 right-0 p-4">
                <div className="bg-blue-900/40 text-blue-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-blue-800">
                  Qualitätsgarantie
                </div>
              </div>
            )}
            <h3 className="text-xl font-bold text-white mb-6 group-hover:text-blue-400 transition-colors">{field.title}</h3>
            <div className={`bg-slate-950/50 rounded-2xl p-8 md:p-12 border ${field.isHighlight ? 'border-blue-900/20' : 'border-slate-800'} min-h-[500px] shadow-inner overflow-y-auto flex flex-col`}>
              <div className="flex-1">
                {field.items ? (
                  /* Liste für Items - Einspaltiges, optimiertes Layout */
                  <div className="grid gap-4 grid-cols-1">
                    {field.items.map((item, iIdx) => {
                      const isLink = !!item.link;
                      const Component = isLink ? 'a' : 'div';
                      const linkProps = isLink ? { href: item.link, target: "_blank", rel: "noopener noreferrer" } : {};
                      
                      return (
                        <Component 
                          key={iIdx} 
                          {...linkProps}
                          className={`p-6 bg-slate-900/40 border border-slate-800/60 rounded-2xl transition-all shadow-lg flex items-center gap-6 ${isLink ? 'hover:border-blue-500/40 hover:bg-slate-900/60 group/item' : 'hover:border-slate-700/60'}`}
                        >
                          {/* Vertikaler Indikator */}
                          <div className={`w-1 self-stretch rounded-full transition-all ${isLink ? 'bg-blue-800/60 group-hover/item:bg-blue-700' : 'bg-blue-900'}`} />
                          
                          <div className="flex-1">
                            <p className={`text-slate-300 text-sm md:text-base leading-relaxed transition-colors ${isLink ? 'group-hover/item:text-white font-medium' : 'font-light'}`}>
                              {item.text}
                            </p>
                            {isLink && (
                              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-blue-400 group-hover/item:text-blue-300 mt-2">
                                <span>Zur Website</span>
                                <svg className="w-3 h-3 transition-transform group-hover/item:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </Component>
                      );
                    })}
                  </div>
                ) : (
                  field.text && field.text.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx} className={`${field.isHighlight && pIdx === 0 ? 'text-blue-600 font-bold text-xl mb-8 border-b border-blue-900/20 pb-6' : 'text-blue-800 italic md:text-lg mb-6 last:mb-0'} leading-relaxed`}>
                      {paragraph}
                    </p>
                  ))
                )}
              </div>
              
              {/* Footer Link (z.B. für "Wir bilden aus") */}
              {field.footerLink && (
                <div className="mt-8 pt-6 border-t border-blue-900/20">
                  <a 
                    href={field.footerLink.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold transition-all group"
                  >
                    <span className="border-b-2 border-blue-400/30 group-hover:border-blue-300 transition-all">
                      {field.footerLink.text}
                    </span>
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              )}
              
              {field.ctaImage && field.ctaLink && (
                <div className="mt-8 pt-6 border-t border-slate-800/40 text-center">
                  <a 
                    href={field.ctaLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block group/cta transition-transform hover:scale-105 active:scale-95"
                  >
                    <div className="bg-white p-7 rounded-2xl shadow-xl border border-slate-200 hover:shadow-blue-500/20 transition-all">
                      <img 
                        src={field.ctaImage} 
                        alt="IHK Siegel" 
                        className="h-24 md:h-32 w-auto object-contain brightness-100 transition-all group-hover/cta:brightness-110"
                      />
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ImpressumPage = ({ setView }: { setView: (v: View) => void }) => (
  <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
    <button 
      onClick={() => setView('home')}
      className="mb-12 flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-semibold"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Zurück zur Startseite
    </button>
    
    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-10 text-glow">Impressum</h1>
    
    <div className="space-y-12 text-slate-300 leading-relaxed">
      <section>
        <h2 className="text-xl font-bold text-white mb-4">Angaben gemäß § 5 TMG</h2>
        <p>
          Michael Kiefer<br />
          Max Josefs Platz 2<br />
          83022 Rosenheim
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4">Kontakt</h2>
        <p>
          Telefon: +49 (0) 8031 61626-0<br />
          E-Mail: info@svkiefer.de
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4">Aufsichtsbehörde / Kammer</h2>
        <p>
          Industrie- und Handelskammer für München und Oberbayern<br />
          Max-Joseph-Straße 2<br />
          80333 München
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4">Berufsbezeichnung und berufsrechtliche Regelungen</h2>
        <p>
          Bestellungstenor: Für die Bewertung von bebauten und unbebauten Grundstücken von der Industrie- und Handelskammer für München und Oberbayern öffentliche bestellt und vereidigt
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>
    </div>
  </div>
);

const DatenschutzPage = ({ setView }: { setView: (v: View) => void }) => (
  <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
    <button 
      onClick={() => setView('home')}
      className="mb-12 flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-semibold"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Zurück zur Startseite
    </button>
    
    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-10 text-glow">Datenschutz</h1>
    
    <div className="space-y-12 text-slate-300 leading-relaxed">
      <section>
        <h2 className="text-xl font-bold text-white mb-4">1. Datenschutz auf einen Blick</h2>
        <h3 className="text-lg font-semibold text-slate-100 mb-2">Allgemeine Hinweise</h3>
        <p>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4">2. Datenerfassung auf dieser Website</h2>
        <h3 className="text-lg font-semibold text-slate-100 mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
        <p>
          Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4">3. Ihre Rechte</h2>
        <p>
          Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4">4. Hosting</h2>
        <p>
          Wir hosten die Inhalte unserer Website bei folgendem Anbieter: Google Cloud Platform (GCP). Die Datenverarbeitung erfolgt auf Basis unseres berechtigten Interesses an einer möglichst fehlerfreien und sicheren Bereitstellung unseres Webangebots (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
      </section>
    </div>
  </div>
);

// --- Hauptanwendung ---

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  // Schließt Overlays beim View-Wechsel
  useEffect(() => {
    if (isContactOpen) setIsContactOpen(false);
  }, [currentView]);

  const services: ServiceItem[] = [
    { 
      title: "Verkehrswertgutachten zur Vorlage beim Finanzamt", 
      detailsUrl: "https://app.heygen.com/embedded-player/69a8f1ab69d24521be40c3459632dca2" 
    },
    { title: "Verkehrswertgutachten für Erbschaftsangelegenheiten & Nachfolgeplanung" },
    { title: "Verkehrswertgutachten für Scheidung & Anteilsauseinandersetzung" },
    { title: "Verkehrswertgutachten für Kauf & Verkauf" },
    { title: "Verkehrswertgutachten für Betreuung & Nachlassverwaltung" },
    { title: "Gutachten für die Mieterhöhung" },
    { title: "Gutachterliche Stellungnahme zum Nachweis einer verkürzten Restnutzungsdauer" },
    { title: "Verkehrswertgutachten für sonstige Zwecke" },
    { title: "Strategieberatung für private Immobilienbesitzer" },
    { title: "Strategieberatung für betrieblichen Immobilienbesitz (CREM)" },
    { title: "Strategieberatung für landwirtschaftlichen Immobilienbesitz" },
    { title: "Strategieberatung für die private Nachfolgeplanung" }
  ];

  const tools = [
    {
      title: "Expose-Check",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6" />
        </svg>
      )
    },
    {
      title: "Modernisierungs-\nkostenermittlung",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      )
    },
    {
      title: "Wertschätzung für Wohnimmobilien",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Podcasts & EBooks",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l-3 3m0 0l-3-3m3 3V4" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-slate-950 min-h-screen selection:bg-blue-500/30 text-white font-sans">
      <HeaderButtons setView={setCurrentView} />
      
      {currentView === 'home' && (
        <>
          <Hero onOpenContact={() => setIsContactOpen(true)} />
          {/* Sektion Dienstleistungen */}
          <section className="py-32 bg-slate-950">
            <div className="container mx-auto px-6">
              <div className="text-center mb-24">
                <h2 className="text-sm font-bold text-blue-500 uppercase tracking-[0.4em] mb-6">Portfolio</h2>
                <h3 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">Unsere Dienstleistungen</h3>
                <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
                {services.map((service, idx) => (
                  <ServiceCard key={idx} title={service.title} detailsUrl={service.detailsUrl} />
                ))}
              </div>
            </div>
          </section>

          {/* Sektion Online-Tools */}
          <section className="py-32 bg-slate-900/20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent pointer-events-none" />
            <div className="container mx-auto px-6 relative z-10">
              <div className="text-center mb-20">
                <h2 className="text-sm font-bold text-sky-400 uppercase tracking-[0.3em] mb-4">Digital</h2>
                <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Unsere Online-Tools</h3>
                <div className="h-1.5 w-24 bg-gradient-to-r from-sky-400 to-blue-600 mx-auto rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {tools.map((tool, idx) => (
                  <ToolCard key={idx} title={tool.title} icon={tool.icon} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {currentView === 'impressum' && <ImpressumPage setView={setCurrentView} />}
      {currentView === 'datenschutz' && <DatenschutzPage setView={setCurrentView} />}
      {currentView === 'ueber-uns' && <UeberUnsPage setView={setCurrentView} />}
      {currentView === 'dokumenten-verwaltung' && (
        <DokumentenVerwaltungPage setView={setCurrentView} />
      )}

      <Footer setView={setCurrentView} />

      {/* Kontakt Overlay */}
      <ModalOverlay 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
        title="Kontaktanfrage"
        url="https://form.typeform.com/to/I3UTiANj"
      />
    </div>
  );
};

export default App;