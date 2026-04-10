import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Package, Calendar, FileCheck, ExternalLink } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

export interface SeedPartner {
  id: string
  name: string
  location: string
  country: string
  photo: string
  species: number
  quantityKg: number
  lastAudit: string
  custodyDoc?: string
  description: string
  status: 'active' | 'pending' | 'onboarding'
}

interface ReserveCardProps {
  partner: SeedPartner
  className?: string
}

const STATUS_LABELS: Record<SeedPartner['status'], { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-germ/20 text-germ-2 border border-germ/30' },
  onboarding: { label: 'Onboarding', className: 'bg-kernel/20 text-kernel border border-kernel/30' },
  pending: { label: 'Pending', className: 'bg-stone/20 text-stone-2 border border-stone/30' },
}

export function ReserveCard({ partner, className }: ReserveCardProps) {
  const statusMeta = STATUS_LABELS[partner.status]

  return (
    <article
      className={cn(
        'card-glass overflow-hidden flex flex-col transition-transform hover:-translate-y-0.5',
        className
      )}
    >
      {/* Photo */}
      <div className="relative h-48 bg-soil-2 overflow-hidden">
        <Image
          src={partner.photo}
          alt={`${partner.name} seed bank`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-soil/80 to-transparent" />

        {/* Status badge */}
        <span
          className={cn(
            'absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full',
            statusMeta.className
          )}
        >
          {statusMeta.label}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-5 flex-1">
        <div>
          <h3 className="font-display text-lg text-husk leading-tight mb-1">{partner.name}</h3>
          <div className="flex items-center gap-1.5 text-stone-2 text-sm">
            <MapPin size={13} className="flex-shrink-0" />
            <span>
              {partner.location}, {partner.country}
            </span>
          </div>
        </div>

        <p className="text-stone-2 text-sm leading-relaxed line-clamp-3">{partner.description}</p>

        {/* Stats */}
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-xs text-stone uppercase tracking-wider mb-0.5 flex items-center gap-1">
              <Package size={11} /> Species
            </dt>
            <dd className="font-mono text-kernel font-semibold">{partner.species.toLocaleString()}</dd>
          </div>
          <div>
            <dt className="text-xs text-stone uppercase tracking-wider mb-0.5">Quantity</dt>
            <dd className="font-mono text-kernel font-semibold">{partner.quantityKg.toLocaleString()} kg</dd>
          </div>
          <div>
            <dt className="text-xs text-stone uppercase tracking-wider mb-0.5 flex items-center gap-1">
              <Calendar size={11} /> Last audit
            </dt>
            <dd className="text-husk-2 font-medium">
              {partner.status === 'pending' ? '—' : formatDate(partner.lastAudit)}
            </dd>
          </div>
        </dl>

        {/* Custody doc link */}
        {partner.custodyDoc ? (
          <a
            href={partner.custodyDoc}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex items-center gap-2 text-sm text-germ-2 hover:text-kernel transition-colors"
          >
            <FileCheck size={14} />
            <span>View custody document</span>
            <ExternalLink size={12} />
          </a>
        ) : (
          <p className="mt-auto text-xs text-stone italic flex items-center gap-1.5">
            <FileCheck size={12} />
            Custody document pending
          </p>
        )}
      </div>
    </article>
  )
}
