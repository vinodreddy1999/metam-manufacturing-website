import Link from "next/link";
import { modules } from "./data/modules";

const outcomes = [
  ["One operational picture", "Connect demand, materials, capacity, maintenance, quality, and cost in one decision layer."],
  ["Plans people can execute", "Turn constraints into clear schedules, assignments, alerts, and approved actions."],
  ["AI with human control", "Surface recommendations and draft actions while critical approvals stay with your team."],
];

export default function Home() {
  return (
    <main>
      <section className="hero shell">
        <div className="hero-copy reveal">
          <span className="eyebrow"><i /> Manufacturing intelligence, made operational</span>
          <h1>Run the factory you can <em>see clearly.</em></h1>
          <p className="lede">METAM connects planning, inventory, production, maintenance, and quality—so every team works from the same live operating picture.</p>
          <div className="actions">
            <Link className="button primary" href="/product">Explore the platform <span>↗</span></Link>
            <Link className="button ghost" href="/pricing">View pricing</Link>
          </div>
          <div className="trust-row"><span>Built for discrete manufacturing</span><span>Multi-plant ready</span><span>Human-approved AI</span></div>
        </div>
        <div className="hero-visual reveal delay-1" aria-label="METAM operational control tower illustration">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="control-card main-card">
            <div className="card-head"><span><i className="live-dot" /> Live operations</span><small>Plant 01</small></div>
            <div className="metric-row"><div><small>Plan attainment</small><strong>94.8%</strong></div><div><small>At-risk orders</small><strong>07</strong></div></div>
            <div className="chart" aria-hidden="true"><i style={{height:"35%"}}/><i style={{height:"52%"}}/><i style={{height:"45%"}}/><i style={{height:"70%"}}/><i style={{height:"63%"}}/><i style={{height:"86%"}}/><i style={{height:"76%"}}/><i style={{height:"92%"}}/></div>
            <div className="signal"><span>AI signal</span><p>Move WO-204 to Line 3 to protect tomorrow&apos;s shipment.</p><button>Review action</button></div>
          </div>
          <div className="float-card inventory"><small>Inventory coverage</small><strong>18.4 days</strong><span>+2.1 days protected</span></div>
          <div className="float-card health"><small>Asset health</small><strong>96%</strong><div className="mini-ring">96</div></div>
        </div>
      </section>

      <section className="signal-strip"><div className="shell signal-grid"><span>Demand changes</span><b>→</b><span>Plan recalculates</span><b>→</b><span>Teams align</span><b>→</b><span>Orders ship</span></div></section>

      <section className="section shell">
        <div className="section-heading"><div><span className="kicker">Connected by design</span><h2>One platform. Every operational rhythm.</h2></div><p>Start with the modules you need today. Add capabilities without rebuilding your operating model.</p></div>
        <div className="module-grid">
          {modules.slice(0,6).map((module, index) => <Link href={`/modules/${module.slug}`} className="module-card" key={module.slug}><span className="module-index">0{index+1}</span><div className="module-icon">{module.icon}</div><h3>{module.name}</h3><p>{module.short}</p><span className="text-link">Explore module →</span></Link>)}
        </div>
        <div className="center-action"><Link className="button ghost dark" href="/modules">View all modules</Link></div>
      </section>

      <section className="section dark-section">
        <div className="shell">
          <div className="section-heading light"><div><span className="kicker">From data to decisions</span><h2>Clarity at every level.</h2></div><p>Give leaders the picture, managers the control, and operators the next best action.</p></div>
          <div className="outcome-grid">{outcomes.map(([title, copy], i) => <article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
          <div className="story-panel">
            <div><span className="eyebrow light"><i /> A closed operational loop</span><h2>Sense. Decide. Execute. Learn.</h2><p>METAM continuously connects source data, business rules, team decisions, and measurable outcomes—without letting automation outrun governance.</p><Link href="/product" className="button light-button">See how it works</Link></div>
            <div className="loop-graphic" aria-label="Sense decide execute learn cycle"><span className="loop-center">METAM<small>Intelligence layer</small></span>{["Sense","Decide","Execute","Learn"].map((x,i)=><i key={x} className={`loop-item item-${i}`}>{x}</i>)}</div>
          </div>
        </div>
      </section>

      <section className="section shell persona-preview">
        <div className="section-heading"><div><span className="kicker">Built for the whole operation</span><h2>Different roles. One truth.</h2></div><Link href="/customers" className="text-link">Meet every persona →</Link></div>
        <div className="persona-row">
          {[["Plant leader","See performance, risk, and priorities across every line."],["Operations manager","Balance orders, capacity, people, and materials in real time."],["Planner","Model scenarios and release plans teams can actually execute."],["IT & platform team","Govern access, integrations, tenants, audit, and deployment."]].map(([name,copy],i)=><article key={name}><div className={`avatar avatar-${i}`}>{name.charAt(0)}</div><h3>{name}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="cta-wrap shell"><div className="cta-panel"><div><span className="kicker">Ready when you are</span><h2>Build a calmer, smarter operation.</h2><p>Start with a focused module set. Grow into one connected manufacturing system.</p></div><div className="actions"><Link href="/pricing" className="button primary">Plan your rollout <span>↗</span></Link><Link href="/compare" className="button ghost dark">Compare editions</Link></div></div></section>
    </main>
  );
}
