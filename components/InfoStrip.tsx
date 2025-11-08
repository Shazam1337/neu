export default function InfoStrip() {
  const Item = ({ title, desc }: { title: string; desc: string }) => (
    <div className="card p-5 text-center card-holographic">
      <div className="section-title font-heading mb-2">{title}</div>
      <div className="text-sm text-neon-cyan/70 leading-relaxed">{desc}</div>
    </div>
  );
  return (
    <div className="container-grid grid md:grid-cols-3 gap-4 mt-8 mb-8">
      <Item 
        title="Neural Signal Scan" 
        desc="AI-driven verification every 3 seconds. Cognitive synchronization via Protocol 402." 
      />
      <Item 
        title="Auto-Energy Stream" 
        desc="Thoughts flow directly to your neural wallet — instant value transmission without claiming." 
      />
      <Item 
        title="On-Chain Cognition" 
        desc="Every signal verified, every connection visible. Full neural transparency on Layer 402." 
      />
    </div>
  );
}
