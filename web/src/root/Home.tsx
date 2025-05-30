import {
  Bike,
  CalendarDays,
  CoinsIcon,
  Hammer,
  HeartHandshake,
  PackagePlusIcon,
  TrafficCone,
  Wrench,
} from 'lucide-react';

import { usePreloadedDataLocalized } from '@hooks/usePreloadedData';
import { Section } from '@components/Section';
import { SectionContent } from '@components/SectionContent';
import { CardDefault } from '@components/CardDefault';
import { CardStory } from '@components/CardStory';
import { CardCompact } from '@components/CardCompact';
import { CardShop } from '@components/CardShop';
import { Partner, partners, stories } from './tempData';
import { GridBetween } from '@components/GridBetween';
import { Page } from '@components/Page';

//

const Statistic = ({ label, value }: { label: string; value: number }) => (
  <div className="flex h-full flex-col items-center justify-start text-center">
    <span className="text-primary mb-8 text-[100px] font-bold leading-[75px]">
      {value}
    </span>
    <span className="text-h3 text-foreground font-bold">{label}</span>
  </div>
);

const PartnerImg = ({ partner }: { partner: Partner }) => (
  <img
    src={partner.src}
    alt={partner.name}
    className="max-h-20 w-auto min-w-0 max-w-64 flex-shrink object-contain
      md:max-w-52"
  />
);

//

export default function Home() {
  const { data } = usePreloadedDataLocalized();

  return (
    <Page hasHeroSection>
      <div
        className="light relative flex w-full flex-col items-center
          justify-center bg-cover bg-center py-24 md:h-[70vh] md:max-h-[40rem]
          md:items-start"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <div
          className="relative z-10 mx-auto flex w-[88vw] flex-col items-start
            gap-4 sm:w-[76vw]"
        >
          <img
            src="/logo.svg"
            alt="Logo"
            className="mb-2 h-12 w-auto sm:mb-4 sm:h-16"
          />
          <h1 className="text-background text-h1">Hjulverkstan</h1>

          <p
            className="text-h3 text-background max-w-[700px] pr-10 !text-xl
              sm:pr-0 sm:!text-3xl"
          >
            A bike shop that changes lives – we bridge gaps and somthing like
            so.
          </p>
        </div>
      </div>

      <Section variant="muted">
        <SectionContent>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
            <CardDefault
              icon={Wrench}
              title={data.generalContent.serviceRepairTitle}
              body={data.generalContent.serviceRepairBody}
              link="/"
            />
            <CardDefault
              icon={CalendarDays}
              title={data.generalContent.serviceRentTitle}
              body={data.generalContent.serviceRentBody}
              link="/"
            />
            <CardDefault
              icon={TrafficCone}
              title={data.generalContent.serviceCoursesTitle}
              body={data.generalContent.serviceCoursesBody}
              link="/"
            />
            <CardDefault
              icon={Bike}
              title={data.generalContent.serviceCommunityTitle}
              body={data.generalContent.serviceCommunityBody}
              link="/"
              linkLabel="Work with us"
            />
          </div>
        </SectionContent>

        <SectionContent
          heading="Stories"
          linkTo="/stories"
          linkLabel="See all stories"
          linkVariant="background"
        >
          <div className=" flex flex-col gap-8 xl:flex-row">
            <div className="flex flex-col gap-8 md:basis-3/4 md:flex-row">
              {stories.slice(0, 2).map((story) => (
                <CardStory
                  key={story.id}
                  story={story}
                  className="h-96 xl:h-auto"
                />
              ))}
            </div>
            <div
              className="flex flex-col gap-8 md:basis-1/3 md:flex-row
                xl:flex-col"
            >
              {stories.slice(2, 4).map((story) => (
                <CardCompact
                  key={story.id}
                  title={story.title}
                  body={story.bodyText}
                  link={`/stories${story.slug}`}
                  ariaLabel={story.title}
                />
              ))}
            </div>
          </div>
        </SectionContent>
      </Section>

      <Section>
        <SectionContent
          heading="Shops"
          linkTo="/shops"
          linkLabel="See all shops"
        >
          <div
            className="grid grid-cols-1 gap-x-8 gap-y-12 md:hidden xl:grid
              xl:grid-cols-3"
          >
            {data.shops.slice(0, 3).map((shop) => (
              <CardShop key={shop.id} shop={shop} />
            ))}
          </div>
          <div
            className="hidden gap-x-8 gap-y-12 md:grid md:grid-cols-2 xl:hidden"
          >
            {data.shops.slice(0, 4).map((shop) => (
              <CardShop key={shop.id} shop={shop} />
            ))}
          </div>
        </SectionContent>
      </Section>

      <div className="border-divider w-full border-t"></div>

      <Section>
        <SectionContent>
          <div
            className="flex flex-col items-center justify-center gap-x-32
              gap-y-24 sm:grid sm:grid-cols-2 sm:px-16 md:px-36
              min-[1200px]:flex min-[1200px]:flex-row
              min-[1200px]:items-baseline min-[1200px]:px-0"
          >
            <Statistic label="Bikes repaired" value={628} />
            <Statistic label="Bikes saved" value={500} />
            <Statistic label="Bikes lent" value={86} />
            <Statistic label="Employees hired" value={30} />
          </div>
        </SectionContent>
      </Section>

      <div className="border-divider w-full border-t"></div>

      <Section>
        <SectionContent heading="Join us">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
            <CardDefault
              icon={PackagePlusIcon}
              title="Donate material"
              body="Support us with bikes, tools, or other useful items. Your donation helps keep the project rolling."
              link="/"
              ariaLabel="Learn more about donating material"
              variant="muted"
            />
            <CardDefault
              icon={CoinsIcon}
              title="Donate via Swish"
              body="Swish a contribution, every bit helps us empower young people and build a stronger community."
              link="/"
              ariaLabel="Learn more about donating via Swish"
              variant="muted"
            />
            <CardDefault
              icon={Hammer}
              title="Work with us"
              body="We offer opportunities to get involved, learn new skills, and be part of our workshops."
              link="/"
              ariaLabel="Learn more about working with us"
              variant="muted"
            />
            <CardDefault
              icon={HeartHandshake}
              title="Become a partner"
              body="We welcome partnerships that promote sustainability and inclusion. Feel free to reach out!"
              link="/"
              ariaLabel="Learn more about becoming a partner"
              linkLabel="Contact us"
              variant="muted"
            />
          </div>
        </SectionContent>
      </Section>

      <Section variant="muted">
        <SectionContent
          heading="Our partners"
          linkTo="/partners"
          linkLabel="See all partners"
          linkVariant="background"
        >
          <GridBetween rows={2} cols={4} className="hidden lg:flex">
            {partners.map((partner, index) => (
              <PartnerImg key={index} partner={partner} />
            ))}
          </GridBetween>

          <GridBetween
            rows={2}
            cols={3}
            className="hidden min-[700px]:flex lg:hidden"
          >
            {partners.map((partner, index) => (
              <PartnerImg key={index} partner={partner} />
            ))}
          </GridBetween>

          <GridBetween
            rows={3}
            cols={2}
            className="flex min-[700px]:hidden"
            rowClassName="gap-16"
          >
            {partners.map((partner, index) => (
              <PartnerImg key={index} partner={partner} />
            ))}
          </GridBetween>
        </SectionContent>
      </Section>
    </Page>
  );
}
