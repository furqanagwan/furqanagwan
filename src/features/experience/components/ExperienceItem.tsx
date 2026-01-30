import Image from "next/image";
import { BrandLogo } from "@/components/ui/BrandLogo";
import type { GroupedExperience } from "../utils";

interface ExperienceItemProps {
  group: GroupedExperience;
  index: number;
}

export function ExperienceItem({ group, index }: ExperienceItemProps) {
  return (
    <article
      className="group relative py-8 border-b border-black/15 dark:border-white/15 last:border-b-0 hover:border-black dark:hover:border-white transition-colors animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
    >
      <div className="grid md:grid-cols-4 gap-6 md:gap-10">
        {/* Left column - Company info */}
        <div className="md:col-span-1">
          <div className="mb-4 relative w-16 h-16 rounded-md overflow-hidden bg-white border border-border flex items-center justify-center p-1">
            <BrandLogo
              name={group.company}
              productLink={group.website}
              brandDomain={group.website ? undefined : undefined} // brandDomain is inferred from productLink if not provided, or undefined
              className="w-full h-full"
              fallback={
                group.image ? (
                  <Image
                    src={group.image}
                    alt={group.company}
                    width={64}
                    height={64}
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <span className="text-xs font-bold text-center">
                    {group.company.substring(0, 2)}
                  </span>
                )
              }
            />
          </div>
          <div className="sticky top-24">
            <p className="text-[13px] text-muted-foreground mb-1 font-medium tracking-wide uppercase">
              {group.startDate} – {group.endDate || "Present"}
            </p>
            <h3 className="font-bold text-lg leading-tight">{group.company}</h3>
            <p className="text-muted-foreground text-sm mt-1">
              {group.location}
            </p>
          </div>
        </div>

        {/* Right column - Roles */}
        <div className="md:col-span-3 space-y-12">
          {group.roles.map((role, roleIndex) => (
            <div key={`${role.role}-${roleIndex}`} className="relative">
              {/* Role connector line if multiple roles */}
              {roleIndex !== group.roles.length - 1 && (
                <div className="absolute left-[-24px] top-2 bottom-[-48px] w-px bg-border md:hidden" />
              )}

              <div className="flex flex-col gap-1 mb-4">
                <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {role.role}
                </h2>
                {group.roles.length > 1 && (
                  <p className="text-[13px] text-muted-foreground">
                    {role.startDate} – {role.endDate || "Present"}
                  </p>
                )}
              </div>

              {/* Clients - displayed as detailed block under the title */}
              {role.clients && role.clients.length > 0 && (
                <div className="flex flex-col gap-3 mb-6">
                  {role.clients.map((client) => (
                    <div key={client.name} className="flex items-start gap-3">
                      <div className="w-12 h-12 shrink-0 rounded-md overflow-hidden bg-white border border-border flex items-center justify-center p-1 shadow-sm">
                        <BrandLogo
                          name={client.name}
                          brandDomain={client.domain}
                          className="w-full h-full"
                          fallback={
                            <span className="text-xs font-bold text-center">
                              {client.name.substring(0, 2)}
                            </span>
                          }
                        />
                      </div>
                      <div className="mt-0.5">
                        <h4 className="font-bold text-base leading-tight">
                          {client.name}
                        </h4>
                        <p className="text-muted-foreground text-sm mt-0.5">
                          {client.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Achievements */}
              {role.achievements && role.achievements.length > 0 && (
                <ul className="space-y-2 mb-6">
                  {role.achievements.slice(0, 3).map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px]">
                      <span className="text-primary mt-1.5 shrink-0 text-xs">
                        ●
                      </span>
                      <span className="text-muted-foreground">
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {role.technologies.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-[12px] rounded-full bg-secondary text-secondary-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
