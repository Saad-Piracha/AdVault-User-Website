import { motion } from 'framer-motion'
import { 
  Activity, BarChart3, CalendarClock, Cloud, CloudCog, 
  FileBarChart, MapPin, MonitorSmartphone, PlaySquare, 
  Route, ShieldCheck, Smartphone, Sparkles, Tv, Users, Video 
} from 'lucide-react'

const reveal = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }

const homeFeatures = [
  ['Geofencing', MapPin], 
  ['Heatmaps', Route], 
  ['Real-time Analytics', Activity], 
  ['Plays By Hour', BarChart3], 
  ['Zone Analytics', MapPin], 
  ['Campaign Management', Sparkles], 
  ['Video Support', Video], 
  ['Image Ads', PlaySquare], 
  ['Multiple Campaigns', CalendarClock], 
  ['Cloud Management', CloudCog], 
  ['Live Device Monitoring', MonitorSmartphone], 
  ['Secure Platform', ShieldCheck], 
  ['Brand Dashboard', Users], 
  ['Campaign Scheduling', CalendarClock], 
  ['Default Advertisements', Tv], 
  ['Interactive Maps', Route], 
  ['Remote Updates', Cloud], 
  ['Performance Reports', FileBarChart], 
  ['Ad Preview', PlaySquare], 
  ['Role Based Access', ShieldCheck], 
  ['Responsive Dashboard', Smartphone]
] as const

export function DetailedFeatureGrid() { 
  return (
    <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }} 
          variants={reveal} 
          className="flex max-w-2xl flex-col gap-4"
        >
          <p className="section-kicker">Platform features</p>
          <h2 className="text-4xl font-semibold tracking-[-.05em] text-[#07182d] sm:text-5xl">
            One operating system for mobile attention.
          </h2>
          <p className="text-lg leading-8 text-slate-600">
            Every capability needed to plan, deliver and prove the value of intelligent in-cab advertising.
          </p>
        </motion.div>
        <div className="mt-12 grid grid-cols-2 overflow-hidden rounded-[22px] border border-slate-200 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {homeFeatures.map(([label, Icon], index) => (
            <motion.div 
              key={label} 
              initial={{ opacity: 0, scale: 0.96 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }} 
              transition={{ delay: (index % 7) * 0.035 }} 
              className="detail-feature"
            >
              <Icon size={19} />
              <span>{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  ) 
}
