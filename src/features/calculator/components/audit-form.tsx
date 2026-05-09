'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ChevronRight, ChevronLeft, Calculator } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { auditFormSchema, AuditFormData } from '../schema';
import { PRICING_CONFIG } from '@/config/pricing';
import { submitAuditAction } from '@/app/actions/audit';
import { useRouter } from 'next/navigation';

const STEPS = [
  { id: 'team', title: 'Team Profile' },
  { id: 'tools', title: 'AI Stack' },
  { id: 'review', title: 'Review' },
];

export function AuditForm() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<AuditFormData>({
    resolver: zodResolver(auditFormSchema),
    defaultValues: {
      teamSize: 5,
      useCase: 'startup',
      items: [{ toolId: 'chatgpt', tier: 'plus', monthlySpend: 20, seats: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const next = async () => {
    const fieldsToValidate = step === 0 ? ['teamSize', 'useCase'] : ['items'];
    const isValid = await form.trigger(fieldsToValidate as Array<keyof AuditFormData>);
    if (isValid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (data: AuditFormData) => {
    setIsSubmitting(true);
    try {
      const response = await submitAuditAction(data);
      if (response.success && response.result) {
        // In the next phase, we'll redirect to a real ID. 
        // For now, we'll store in a temp state or use a dummy ID.
        router.push('/report/demo');
      } else {
        alert(response.error || 'Something went wrong');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium">
          <span>Step {step + 1} of {STEPS.length}: {STEPS[step].title}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {step === 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Tell us about your team</CardTitle>
                  <CardDescription>This helps us understand your potential for scale and optimization.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="teamSize">Total Team Size</Label>
                    <Input
                      id="teamSize"
                      type="number"
                      {...form.register('teamSize', { valueAsNumber: true })}
                      placeholder="e.g. 10"
                    />
                    {form.formState.errors.teamSize && (
                      <p className="text-sm text-destructive">{form.formState.errors.teamSize.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="useCase">Primary Use Case</Label>
                    <Select
                      onValueChange={(v) => form.setValue('useCase', v as AuditFormData['useCase'])}
                      defaultValue={form.getValues('useCase')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select use case" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual / Freelancer</SelectItem>
                        <SelectItem value="startup">Startup / SMB</SelectItem>
                        <SelectItem value="enterprise">Large Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 1 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Your AI Stack</CardTitle>
                      <CardDescription>Add the tools you currently pay for.</CardDescription>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => append({ toolId: 'chatgpt', tier: 'plus', monthlySpend: 20, seats: 1 })}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Tool
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {fields.map((field, index) => (
                    <div key={field.id} className="relative space-y-4 rounded-lg border p-4">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 text-muted-foreground hover:text-destructive"
                        onClick={() => remove(index)}
                        disabled={fields.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label>AI Tool</Label>
                          <Select
                            onValueChange={(v) => form.setValue(`items.${index}.toolId`, v || '')}
                            defaultValue={field.toolId}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.values(PRICING_CONFIG).map((t) => (
                                <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Plan Tier</Label>
                          <Select
                            onValueChange={(v) => form.setValue(`items.${index}.tier`, v as AuditFormData['items'][number]['tier'])}
                            defaultValue={field.tier}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="free">Free</SelectItem>
                              <SelectItem value="plus">Plus / Pro</SelectItem>
                              <SelectItem value="team">Team</SelectItem>
                              <SelectItem value="business">Business</SelectItem>
                              <SelectItem value="enterprise">Enterprise</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Monthly Spend ($)</Label>
                          <Input
                            type="number"
                            {...form.register(`items.${index}.monthlySpend`, { valueAsNumber: true })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Number of Seats</Label>
                          <Input
                            type="number"
                            {...form.register(`items.${index}.seats`, { valueAsNumber: true })}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {form.formState.errors.items && (
                    <p className="text-sm text-destructive">{form.formState.errors.items.message}</p>
                  )}
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Ready to Audit?</CardTitle>
                  <CardDescription>Review your details before we calculate your savings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg bg-muted p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Team Size:</span>
                      <span className="font-medium">{form.getValues('teamSize')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">AI Tools:</span>
                      <span className="font-medium">{fields.length} tools tracked</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Reported Spend:</span>
                      <span className="font-medium text-primary">
                        ${form.getValues('items').reduce((acc, curr) => acc + (curr.monthlySpend || 0), 0)}/mo
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>

        <CardFooter className="mt-6 flex justify-between px-0">
          <Button
            type="button"
            variant="ghost"
            onClick={prev}
            disabled={step === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          
          {step < STEPS.length - 1 ? (
            <Button type="button" onClick={next}>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  <Calculator className="mr-2 h-4 w-4" /> Run Audit
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </form>
    </div>
  );
}
