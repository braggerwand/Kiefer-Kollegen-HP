import React, { useState, useEffect } from 'react';

// --- Typen ---
type View = 'home' | 'impressum' | 'datenschutz' | 'ueber-uns';

// --- Komponenten ---

const HeaderButtons = ({ setView }: { setView: (v: View) => void }) => (
  <div className="absolute top-6 right-6 flex gap-4 z-50">
    <button 
      onClick={() => { setView('ueber-uns'); window.scrollTo(0,0); }}
      className="px-5 py-2 text-sm font-semibold bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/50 rounded-full backdrop-blur-md transition-all text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
    >
      Über uns
    </button>
    <button className="px-5 py-2 text-sm font-semibold bg-white/10 hover:bg-white/20 border border-white/20 rounded-full backdrop-blur-md transition-all text-white">
      Dokumentenverwaltung
    </button>
  </div>
);

const Hero = () => (
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
        Kiefer & Kollegen
      </h1>
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-blue-400">
          Sachverständige für Immobilienbewertung & -beratung
        </h2>
        <h3 className="text-sm md:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
          von der Industrie- & Handelskammer für München & Oberbayern öffentlich bestellt und vereidigt
        </h3>
      </div>
      
      <div className="pt-10">
        <button className="px-10 py-4 text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-full shadow-[0_0_30px_rgba(59,130,246,0.3)] transform transition hover:scale-105 active:scale-95 text-white">
          Kontakt
        </button>
      </div>
    </div>
  </section>
);

interface ServiceCardProps {
  title: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title }) => (
  <div className="bg-slate-900/40 border border-slate-800/60 p-6 md:p-8 rounded-3xl backdrop-blur-sm flex flex-col h-full hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
    <div className="relative z-10 flex flex-col h-full">
      <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-transparent mb-6 rounded-full" />
      <h4 className="text-lg md:text-xl font-bold text-white mb-8 group-hover:text-blue-400 transition-colors leading-tight">
        {title}
      </h4>
      <div className="mt-auto flex flex-col sm:flex-row gap-3">
        <button className="flex-1 py-3 px-4 text-[10px] font-bold uppercase tracking-widest bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all">
          Mehr erfahren
        </button>
        <button className="flex-1 py-3 px-4 text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] text-white rounded-xl transition-all">
          Kontakt
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
  <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 md:p-8 rounded-3xl flex flex-col h-full hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:border-sky-500/30 transition-all group">
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
            Max-Josefs-Platz 1<br />
            83022 Rosenheim<br />
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=Max-Josefs-Platz+1,+83022+Rosenheim" 
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
        &copy; {new Date().getFullYear()} Kiefer & Kollegen. Alle Rechte vorbehalten.
      </div>
    </div>
  </footer>
);

// --- Inhaltsseiten ---

const UeberUnsPage = ({ setView }: { setView: (v: View) => void }) => {
  const teamMembers = [
    { 
      name: "Michael Kiefer", 
      suffix: "frics",
      qualifikationen: "Diplom-Sachverständiger (DIA), öffentlich bestellt und vereidigt von der IHK München und Oberbayern. Langjährige Expertise in der Bewertung komplexer Gewerbeimmobilien und Portfolien.",
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=600"
    },
    { 
      name: "Luisa Junge", 
      qualifikationen: "M.Sc. Real Estate Management, spezialisiert auf Markt- und Beleihungswertermittlung. Expertise in der Bewertung von Wohnimmobilien und nachhaltigen Gebäudekonzepten.",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=600"
    },
    { 
      name: "Unser Team", 
      qualifikationen: "Qualifizierte Rechercheure und Backoffice-Spezialisten für präzise Marktanalysen. Wir arbeiten interdisziplinär, um höchste Gutachtenqualität zu garantieren.",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600&h=600"
    }
  ];

  const expertiseFields = [
    { title: "Öffentliche Bestellung und Vereidigung", text: "Die öffentliche Bestellung und vereidigung durch die IHK bürgt für besondere Sachkunde sowie Objektivität und Neutralität. Dies ist insbesondere bei gerichtlichen Auseinandersetzungen und steuerlichen Bewertungen von entscheidender Bedeutung." },
    { title: "Mitgliedschaften", text: "Wir sind aktiv vernetzt in führenden Verbänden wie RICS (Royal Institution of Chartered Surveyors) und regionalen Gremien. Dies ermöglicht uns den Zugriff auf exklusive Marktdaten und internationale Bewertungsstandards." },
    { title: "Spezialgebiete", text: "Schwerpunkte in der Bewertung von Wohn-, Gewerbe- und Sonderimmobilien sowie landwirtschaftlichen Flächen in Oberbayern. Wir decken das gesamte Spektrum von der Einzimmerwohnung bis hin zum Industriekomplex ab." },
    { title: "Aus- und Weiterbildung", text: "Kontinuierliche Fortbildung sichert die Berücksichtigung aktuellster Rechtsprechungen und Markttrends in unseren Gutachten. Wir investieren jährlich signifikant in die Weiterentwicklung unserer Fachexpertise." }
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
        {teamMembers.map((member, idx) => (
          <div key={idx} className="bg-slate-900/50 border border-slate-800 p-8 md:p-12 rounded-3xl backdrop-blur-sm flex flex-col items-center text-center">
            <div className="relative mb-10">
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-125" />
              <img 
                src={member.imageUrl} 
                alt={member.name} 
                className="relative w-64 h-64 md:w-72 md:h-72 object-cover rounded-3xl border-2 border-slate-700 shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 tracking-tight flex items-baseline gap-2">
              {member.name} 
              {member.suffix && (
                <span className="text-[0.5em] font-medium lowercase text-blue-400/80">
                  {member.suffix}
                </span>
              )}
            </h3>
            <div className="w-full text-left mt-4 border-t border-slate-800/80 pt-10">
              <h4 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-6">Qualifikationen</h4>
              <div className="bg-slate-950/60 rounded-2xl p-6 md:p-8 border border-slate-800 min-h-[250px] shadow-inner">
                <p className="text-slate-300 leading-relaxed text-sm md:text-base italic">
                  {member.qualifikationen}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-24" />

      {/* Expertise Sektion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {expertiseFields.map((field, idx) => (
          <div key={idx} className="bg-slate-900/30 border border-slate-800/60 p-10 rounded-3xl hover:border-blue-500/30 transition-all group">
            <h3 className="text-xl font-bold text-white mb-6 group-hover:text-blue-400 transition-colors">{field.title}</h3>
            <div className="bg-slate-950/50 rounded-2xl p-8 md:p-12 border border-slate-800 min-h-[500px] shadow-inner">
              <p className="text-slate-400 leading-relaxed italic md:text-lg">
                {field.text}
              </p>
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
          Kiefer & Kollegen<br />
          Max-Josefs-Platz 1<br />
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
        <p className="mb-4">
          Berufsbezeichnung: Öffentlich bestellte und vereidigte Sachverständige für Immobilienbewertung
        </p>
        <p>
          Zuständige Kammer: Industrie- und Handelskammer für München und Oberbayern
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const services = [
    "Verkehrswertgutachten zur Vorlage beim Finanzamt",
    "Verkehrswertgutachten für Erbschaftsangelegenheiten & Nachfolgeplanung",
    "Verkehrswertgutachten für Scheidung & Anteilsauseinandersetzung",
    "Verkehrswertgutachten für Kauf & Verkauf",
    "Verkehrswertgutachten für Betreuung & Nachlassverwaltung",
    "Gutachten für die Mieterhöhung",
    "Gutachterliche Stellungnahme zum Nachweis einer verkürzten Restnutzungsdauer",
    "Verkehrswertgutachten für sonstige Zwecke",
    "Strategieberatung für private Immobilienbesitzer",
    "Strategieberatung für betrieblichen Immobilienbesitz (CREM)",
    "Strategieberatung für landwirtschaftlichen Immobilienbesitz",
    "Strategieberatung für die private Nachfolgeplanung"
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
          <Hero />
          {/* Sektion Dienstleistungen */}
          <section className="py-32 bg-slate-950">
            <div className="container mx-auto px-6">
              <div className="text-center mb-20">
                <h2 className="text-sm font-bold text-blue-500 uppercase tracking-[0.3em] mb-4">Portfolio</h2>
                <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Unsere Dienstleistungen</h3>
                <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
                {services.map((service, idx) => (
                  <ServiceCard key={idx} title={service} />
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

      <Footer setView={setCurrentView} />
    </div>
  );
};

export default App;