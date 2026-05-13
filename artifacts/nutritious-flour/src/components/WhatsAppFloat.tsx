import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L0 24l6.335-1.508A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.651-.51-5.17-1.399l-.371-.22-3.763.896.952-3.671-.242-.381A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

export default function WhatsAppFloat() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const shareText = encodeURIComponent(
    "Check out Unga Sawa Mix — nutritious homemade flour, quality cereals, and milling services in Mwea, Kirinyaga. Natural ingredients, fair prices, and nationwide delivery!"
  );
  const shareUrl = encodeURIComponent(typeof window !== "undefined" ? window.location.href : "");
  const shareWaUrl = `https://wa.me/?text=${shareText}%0A${shareUrl}`;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <a
          href={shareWaUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="button-whatsapp-share"
          aria-label="Share on WhatsApp"
          title="Share this page"
          className="flex items-center gap-2 bg-white text-[#25D366] border-2 border-[#25D366] rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 px-4 py-2.5"
        >
          <ShareIcon className="w-4 h-4 shrink-0" />
          <span className="text-sm font-semibold">Share</span>
        </a>
        <a
          href="https://wa.me/254721339862"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="button-whatsapp"
          aria-label="Chat on WhatsApp"
          className="flex items-center gap-2 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 px-4 py-3"
        >
          <WhatsAppIcon className="w-6 h-6 shrink-0" />
          <span className="text-sm font-semibold">Chat with us</span>
        </a>
      </div>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-testid="button-back-to-top"
          aria-label="Back to top"
          className="fixed bottom-6 left-6 z-50 w-11 h-11 rounded-full bg-foreground text-background shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center"
        >
          <ChevronUp size={18} />
        </button>
      )}
    </>
  );
}
