import { useEffect, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Cookie, Download, Mail, MapPin, MessageSquareQuote, Newspaper, Phone, Send, ShieldCheck, Sparkles, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const reveal = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }

function InfoCard({ title, body, icon: Icon }: { title: string; body: string; icon: typeof Sparkles }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-[0_12px_35px_rgba(10,29,53,.05)]">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-[#ff6b35]">
        <Icon size={20} />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-[#0a1d35]">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-600">{body}</p>
    </div>
  )
}

export function CTASection({ eyebrow, title, copy, href = '/contact' }: { eyebrow: string; title: string; copy: string; href?: string }) {
  return (
    <section className="px-5 py-16 sm:px-8 lg:py-20">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={reveal}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-orange-100 bg-gradient-to-br from-[#07182d] via-[#0f2d4e] to-[#13395e] px-7 py-12 shadow-[0_20px_70px_rgba(6,24,45,.18)] sm:px-10 lg:px-14"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">{eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] text-white sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">{copy}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="primary" className="px-6 py-3.5">
              <a href={href}>Schedule Demo <ArrowRight size={16} /></a>
            </Button>
            <Button asChild variant="secondary" className="border-white/20 bg-white/10 px-6 py-3.5 text-white hover:bg-white/20">
              <a href="/advault-media-kit.txt" download>Download Media Kit</a>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export function TestimonialsSection() {
  const testimonials = [
    ['“The team helped us launch an attention-grabbing campaign across Lahore in less than a week.”', 'M. Khan', 'Brand Lead, Northstar Foods'],
    ['“The dashboard makes it simple to understand what is getting attention and where.”', 'A. Fareed', 'Marketing Director, Cityline Retail'],
    ['“This feels like a premium DOOH platform, not a bolt-on ad channel.”', 'S. Noor', 'Growth Manager, BrightLane'],
  ]

  return (
    <section className="bg-[#f8fbfd] px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="section-kicker">Testimonials</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.05em] text-[#07182d] sm:text-5xl">Trusted by ambitious brands that want smarter attention.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">Placeholder client stories until we publish verified case studies and launch partnerships.</p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map(([quote, name, role]) => (
            <motion.article key={quote} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.4 }} className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_15px_40px_rgba(10,29,53,.06)]">
              <div className="flex gap-1 text-[#ff6b35]">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-600">{quote}</p>
              <div className="mt-6">
                <p className="font-semibold text-[#0a1d35]">{name}</p>
                <p className="text-sm text-slate-500">{role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function NewsletterBlock() {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className="px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(10,29,53,.06)] lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="section-kicker">Newsletter</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] text-[#07182d] sm:text-4xl">Get product updates, launch notes and campaign inspiration.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">Subscribe for updates on the AdVault roadmap, new geofencing upgrades and DOOH insights from Lahore.</p>
          </div>
          <form onSubmit={handleSubmit} className="rounded-[24px] border border-slate-200 bg-[#f9fbfd] p-5 sm:p-6">
            <label className="text-sm font-medium text-slate-700" htmlFor="newsletter-email">Email address</label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input id="newsletter-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required placeholder="you@example.com" className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-0 focus:border-[#ff6b35]" />
              <Button type="submit" className="whitespace-nowrap px-5 py-3">Subscribe</Button>
            </div>
            <p className="mt-3 flex items-center gap-2 text-sm text-slate-500" aria-live="polite">
              <Newspaper size={16} className="text-[#ff6b35]" />
              {submitted ? 'Thanks — your inbox is on the list.' : 'No spam. Just practical updates.'}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

export function MediaKitButton() {
  return (
    <a href="/advault-media-kit.txt" download className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20">
      <Download size={16} /> Download media kit
    </a>
  )
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem('advault-cookie-consent')
    if (!stored) setVisible(true)
  }, [])

  const handleChoice = (choice: 'accept' | 'decline') => {
    window.localStorage.setItem('advault-cookie-consent', choice)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 1 }}
      className="cookie-banner" 
      role="dialog" 
      aria-label="Cookie consent" 
      aria-live="polite"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-2xl bg-white/15 p-2 text-white">
            <Cookie size={18} />
          </div>
          <div>
            <p className="font-semibold text-white">We use cookies to improve your experience.</p>
            <p className="mt-1 text-sm text-slate-300">AdVault uses essential cookies for the site experience and analytics to understand campaign performance.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => handleChoice('decline')} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20">Decline</button>
          <button type="button" onClick={() => handleChoice('accept')} className="rounded-full bg-[#ff6b35] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#f45b24]">Accept</button>
        </div>
      </div>
    </motion.div>
  )
}

export function AboutPage() {
  return (
    <main className="pt-28 bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.12),_transparent_32%),linear-gradient(180deg,#fff_0%,#f7fbff_100%)]">
      <section className="px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="section-kicker">About AdVault</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-.05em] text-[#07182d] sm:text-5xl lg:text-6xl">Digitizing outdoor advertising with an intelligent DOOH platform.</h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">AdVault exists to bring structure, precision and measurable results to outdoor advertising by making campaigns easier to launch, manage and prove. Our mission is to modernize how brands reach audiences in motion, starting with smart in-cab screens across Lahore and beyond.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="px-6 py-3.5">
                <a href="/contact">Schedule Demo <ArrowRight size={16} /></a>
              </Button>
              <Button asChild variant="secondary" className="px-6 py-3.5">
                <a href="/platform">Explore Platform</a>
              </Button>
            </div>
          </div>
          <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_25px_70px_rgba(10,29,53,.08)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ff6b35]">Our vision</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-.04em] text-[#07182d]">A future where every outdoor screen is intelligent, measurable and relevant.</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">We believe the next era of outdoor advertising will be defined by DOOH technology, geofencing and audience-aware delivery. AdVault is building the operating layer that helps brands move from static placement to adaptive, data-informed media.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-[#f7fbff] p-4">
                <p className="text-sm font-semibold text-[#0a1d35]">Mission</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">Make premium outdoor media accessible, flexible and easy to measure through connected technology.</p>
              </div>
              <div className="rounded-2xl bg-[#fff8f2] p-4">
                <p className="text-sm font-semibold text-[#0a1d35]">Vision</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">Partner with brands to create adaptive, high-attention campaigns that reach the right audience at the right moment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:pb-28">
        <div className="mx-auto max-w-7xl rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_20px_55px_rgba(10,29,53,.06)] lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="section-kicker">Leadership</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] text-[#07182d] sm:text-4xl">Meet Saad Piracha, founder and CEO.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">Based in Lahore, Pakistan, Saad leads AdVault’s growth strategy and believes the future of digital advertising is rooted in connected screens, intelligent targeting and meaningful audience experiences.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <InfoCard title="Lahore rooted" body="AdVault is built from Lahore and shaped by the pace, movement and commercial energy of Pakistan’s largest city." icon={MapPin} />
              <InfoCard title="Platform-first" body="We position AdVault as a digital out of home technology platform that combines screens, geofencing and analytics." icon={ShieldCheck} />
              <InfoCard title="Premium execution" body="Every campaign is supported with planning, creative review and performance visibility from day one." icon={Sparkles} />
              <InfoCard title="Future-ready" body="The platform is designed to expand from in-cab advertising into broader digital outdoor ecosystems over time." icon={CheckCircle2} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="pt-28 bg-[linear-gradient(180deg,#fff_0%,#f7fbff_100%)]">
      <section className="px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_25px_70px_rgba(10,29,53,.08)] lg:p-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <p className="section-kicker">Contact</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-.05em] text-[#07182d] sm:text-5xl">Let’s build the right campaign for your brand.</h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">Speak with the AdVault team about pilot launches, growth campaigns or enterprise rollouts across Lahore and beyond.</p>
            </div>
            <Button asChild className="px-6 py-3.5">
              <a href="mailto:advault03@gmail.com">Schedule Demo <ArrowRight size={16} /></a>
            </Button>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[24px] border border-slate-200 bg-[#f8fbfd] p-7">
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-orange-50 p-2 text-[#ff6b35]"><Mail size={18} /></div>
                  <div>
                    <p className="text-sm font-semibold text-[#0a1d35]">Email</p>
                    <a href="mailto:advault03@gmail.com" className="mt-1 block text-base text-slate-600 hover:text-[#ff6b35]">advault03@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-orange-50 p-2 text-[#ff6b35]"><Phone size={18} /></div>
                  <div>
                    <p className="text-sm font-semibold text-[#0a1d35]">Phone</p>
                    <a href="tel:+923234734649" className="mt-1 block text-base text-slate-600 hover:text-[#ff6b35]">0323-4734649</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-orange-50 p-2 text-[#ff6b35]"><MapPin size={18} /></div>
                  <div>
                    <p className="text-sm font-semibold text-[#0a1d35]">CEO</p>
                    <p className="mt-1 text-base text-slate-600">Saad Piracha · Lahore, Pakistan</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-[24px] border border-slate-200">
                <iframe title="AdVault office map" src="https://www.google.com/maps?q=Lahore,Pakistan&z=12&output=embed" loading="lazy" className="map-frame" />
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(10,29,53,.04)] sm:p-8">
              <div className="flex items-center gap-2 text-[#ff6b35]">
                <MessageSquareQuote size={18} />
                <p className="text-sm font-semibold uppercase tracking-[0.2em]">Schedule Demo</p>
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-.04em] text-[#07182d]">Tell us what you need and we’ll help you plan the right launch.</h2>
              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="contact-name" className="mb-2 text-sm font-medium text-slate-700">Name</label>
                    <input id="contact-name" required className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#ff6b35] text-slate-800" placeholder="Amina Shah" />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="contact-company" className="mb-2 text-sm font-medium text-slate-700">Company</label>
                    <input id="contact-company" required className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#ff6b35] text-slate-800" placeholder="Brand Name" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="contact-email" className="mb-2 text-sm font-medium text-slate-700">Email</label>
                    <input id="contact-email" type="email" required className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#ff6b35] text-slate-800" placeholder="you@company.com" />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="contact-phone" className="mb-2 text-sm font-medium text-slate-700">Phone</label>
                    <input id="contact-phone" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#ff6b35] text-slate-800" placeholder="03xx-xxxxxxx" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="contact-message" className="mb-2 text-sm font-medium text-slate-700">Message</label>
                  <textarea id="contact-message" required rows={5} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#ff6b35] text-slate-800" placeholder="Tell us about your campaign goals, locations and timeline." />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button type="submit" className="px-6 py-3.5">Send Message <Send size={16} /></Button>
                  <p className="text-sm text-slate-500" aria-live="polite">{submitted ? 'Thanks — our team will reach out shortly.' : 'We usually respond within one business day.'}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export function PricingSection() {
  const tiers = [
    ['Pilot', 'Perfect for new campaigns and early launches.', 'Ideal for test-and-learn activity across a small fleet or zone.'],
    ['Growth', 'Best for brands scaling across multiple geographies and campaign goals.', 'Includes expanded targeting and more complete reporting.'],
    ['Enterprise', 'Built for large-scale rollouts with advanced operations and strategic support.', 'Tailored planning, team access and dedicated rollout support.'],
  ]

  return (
    <section id="pricing" className="bg-[#f8fbfd] px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">Pricing</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.05em] text-[#07182d] sm:text-5xl">Flexible plans for pilot launches and expanding DOOH programs.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">All plans are custom quoted so our team can match the right support and inventory to your goals.</p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map(([name, headline, body], index) => (
            <motion.article key={name} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ delay: index * 0.08 }} className="rounded-[24px] border border-slate-200 bg-white p-7 shadow-[0_18px_45px_rgba(10,29,53,.06)]">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-[#07182d]">{name}</h3>
                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b35]">Contact Sales</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">{headline}</p>
              <p className="mt-6 text-sm leading-7 text-slate-600">{body}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 flex-none text-[#ff6b35]" /> Campaign planning support</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 flex-none text-[#ff6b35]" /> Creative and geofencing guidance</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 flex-none text-[#ff6b35]" /> Dashboard access and reporting</li>
              </ul>
              <Button asChild variant="secondary" className="mt-8 w-full justify-center px-6 py-3.5">
                <a href="/contact">Contact Sales</a>
              </Button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function BelowFoldHome() {
  return (
    <>
      <PricingSection />
      <TestimonialsSection />
      <NewsletterBlock />
      <CTASection eyebrow="Ready for your next campaign?" title="Turn on premium in-cab advertising with AdVault." copy="Bring your brand to Lahore’s most attentive audience and launch a campaign that feels smart, premium and measurable." />
    </>
  )
}
