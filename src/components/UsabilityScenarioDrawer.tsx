import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronUp, HelpCircle, ArrowRight, RefreshCw, Sparkles, BookOpen } from 'lucide-react';
import { PageView } from '../types';

interface UsabilityScenarioDrawerProps {
  onNavigate: (page: PageView) => void;
  onResetDemoData: () => void;
}

export const UsabilityScenarioDrawer: React.FC<UsabilityScenarioDrawerProps> = ({
  onNavigate,
  onResetDemoData
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeScenario, setActiveScenario] = useState<number | null>(null);

  const scenarios = [
    {
      id: 1,
      title: 'Scenario 1 – Find an Event',
      task: '“You are interested in participating in a college technical event. Find a suitable upcoming technical event.”',
      successCriteria: 'User navigates to Events, applies the "Technical" category filter or searches "CodeSprint", and identifies an upcoming tech event.',
      recommendedAction: () => onNavigate({ name: 'events', categoryFilter: 'Technical' }),
      actionLabel: 'Go to Technical Events'
    },
    {
      id: 2,
      title: 'Scenario 2 – Understand Event Details',
      task: '“Open the event details and tell me the date, time, venue and eligibility.”',
      successCriteria: 'User clicks "View Details" on CodeSprint 2026 or another card and clearly locates the 4 key data points in the summary grid.',
      recommendedAction: () => onNavigate({ name: 'event-details', eventId: 'codesprint-2026' }),
      actionLabel: 'View CodeSprint 2026 Details'
    },
    {
      id: 3,
      title: 'Scenario 3 – Register for an Event',
      task: '“Register for the selected event using the provided test details.”',
      successCriteria: 'User clicks "Register Now", completes Full Name, Student Email, Department, Year, and Phone, submits, and lands on Confirmation Screen.',
      recommendedAction: () => onNavigate({ name: 'register', eventId: 'codesprint-2026' }),
      actionLabel: 'Open Registration Form'
    },
    {
      id: 4,
      title: 'Scenario 4 – Find Registration Information',
      task: '“You have registered for an event. Find your registration details.”',
      successCriteria: 'User navigates to "My Registrations" from top navigation or confirmation screen, locates their Registration ID, date, and venue.',
      recommendedAction: () => onNavigate({ name: 'my-registrations' }),
      actionLabel: 'Open My Registrations'
    },
    {
      id: 5,
      title: 'Scenario 5 – Find Event Location',
      task: '“You want to attend the event. Find the venue and available location information.”',
      successCriteria: 'User reviews Event Details / Registration card to find building, floor, room number, gate entry, and campus directions.',
      recommendedAction: () => onNavigate({ name: 'event-details', eventId: 'codesprint-2026' }),
      actionLabel: 'Check Venue & Directions'
    }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm sm:max-w-md w-full px-2 sm:px-0">
      <div className="bg-white rounded-xl border border-slate-300 shadow-xl overflow-hidden transition-all duration-300">
        
        {/* Header Bar */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between cursor-pointer select-none hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide">
              UI/UX Usability Testing Guide
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-300 hidden sm:inline">
              5 Test Scenarios
            </span>
            {isOpen ? <ChevronDown className="w-4 h-4 text-slate-300" /> : <ChevronUp className="w-4 h-4 text-slate-300" />}
          </div>
        </div>

        {/* Collapsible Content */}
        {isOpen && (
          <div className="p-4 max-h-[70vh] overflow-y-auto space-y-3 text-slate-800 text-xs sm:text-sm">
            <p className="text-xs text-slate-600 leading-relaxed">
              This panel is provided for usability test moderators and student participants evaluating the 5 assignment testing goals:
            </p>

            {/* Scenario Accordions */}
            <div className="space-y-2">
              {scenarios.map((sc) => {
                const isExpanded = activeScenario === sc.id;
                return (
                  <div
                    key={sc.id}
                    className="border border-slate-200 rounded-lg p-2.5 bg-slate-50 hover:bg-slate-100/70 transition-colors"
                  >
                    <button
                      onClick={() => setActiveScenario(isExpanded ? null : sc.id)}
                      className="w-full text-left font-semibold text-slate-900 flex items-center justify-between"
                    >
                      <span className="font-medium text-xs sm:text-sm text-blue-900">
                        {sc.title}
                      </span>
                      <span className="text-xs text-slate-400">
                        {isExpanded ? 'Hide' : 'Details'}
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="mt-2 pt-2 border-t border-slate-200 space-y-2 text-xs">
                        <div>
                          <span className="font-semibold text-slate-700">User Prompt:</span>
                          <p className="italic text-slate-800 mt-0.5 bg-white p-2 rounded border border-slate-200">
                            {sc.task}
                          </p>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-700">Success Criteria:</span>
                          <p className="text-slate-600 mt-0.5">
                            {sc.successCriteria}
                          </p>
                        </div>
                        <div className="pt-1">
                          <button
                            onClick={() => {
                              sc.recommendedAction();
                              setIsOpen(false);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-md transition-colors"
                          >
                            <span>{sc.actionLabel}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Reset Demo Data Button */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500">Need a clean slate?</span>
              <button
                onClick={() => {
                  onResetDemoData();
                  alert('Demo registrations have been reset to default state.');
                }}
                className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 font-medium px-2 py-1 rounded bg-slate-200/80 hover:bg-slate-200 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Test Data</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
