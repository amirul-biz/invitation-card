import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { createRsvp, fetchRsvpData } from "./rsvp-form.server";
import { RSVP_FORM_CONFIG as CONFIG } from "../../config/config-app-environment";
import { RsvpData } from "../speech-carousel/speech-carousel.ui";



async function sendRsvpMessage(name: string, ucpan: string) {
  await fetch('/api/email-message', {
    method: 'POST',
    cache: 'no-cache',
    body: JSON.stringify({
      name: name,
      ucapan: ucpan
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

async function sendHeadCountMessage() {
  const { data }: { data: RsvpData[] } = await fetchRsvpData();
  await fetch('/api/email-headcount', {
    method: 'POST',
    cache: 'no-cache',
    body: JSON.stringify({
      data: data,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function RSVPModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    speech: "",
    isAttend: false,
    total_person: "",
  });
  const  clearFormValues = async () => {
    await setFormValues({
      name: "",
      speech: "",
      isAttend: false,
      total_person: "",
    });
  };
  

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      setLoading(true);
      await createRsvp(formData);
      await sendRsvpMessage(formValues.name, formValues.speech)
      if(formValues.isAttend) await sendHeadCountMessage()
      await clearFormValues()
      setShowDialog(true);
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      alert("RSVP gagal dihantar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="space-y-4 p-4" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-center text-lg">
            {CONFIG.dialog.title}
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-600">
            {CONFIG.dialog.description}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleForm} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">{CONFIG.labels.name}</Label>
            <Input
              id="name"
              name="name"
              placeholder={CONFIG.placeholders.name}
              required
              value={formValues.name}
              onChange={(e) =>
                setFormValues((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="speech">{CONFIG.labels.speech}</Label>
            <Textarea
              id="speech"
              name="speech"
              placeholder={CONFIG.placeholders.speech}
              rows={3}
              value={formValues.speech}
              required
              onChange={(e) =>
                setFormValues((prev) => ({ ...prev, speech: e.target.value }))
              }
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isAttend"
              name="isAttend"
              checked={formValues.isAttend}
              onCheckedChange={(checked: boolean) => {
                setFormValues((prev) => ({
                  ...prev,
                  isAttend: checked,
                  total_person: checked ? prev.total_person : "",
                }));
              }}
            />
            <Label htmlFor="isAttend">{CONFIG.labels.isAttend}</Label>
          </div>

          {formValues.isAttend && (
            <div className="space-y-1.5">
              <Label htmlFor="total_person">{CONFIG.labels.totalPerson}</Label>
              <Select
                name="total_person"
                value={formValues.total_person}
                onValueChange={(val) =>
                  setFormValues((prev) => ({ ...prev, total_person: val }))
                }
                required
              >
                <SelectTrigger id="total_person">
                  <SelectValue placeholder={CONFIG.placeholders.totalPerson} />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 5 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2 pt-2">
            <Button
              type="submit"
              disabled={loading || (formValues.isAttend && !formValues.total_person)}
              className="w-full text-black bg-grey-700 hover:bg-grey-700"
            >
              {loading ? CONFIG.buttons.submitLoading : CONFIG.buttons.submit}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full bg-red-500 text-white hover:bg-red-600"
              onClick={() => onOpenChange(false)}
            >
              {CONFIG.buttons.cancel}
            </Button>
          </div>
        </form>
      </DialogContent>

      {/* Thank You Modal */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="text-center">
          <DialogHeader className="flex flex-col items-center gap-2">
            <CheckCircle2 className="w-12 h-12 text-green-600 bg-green-100 rounded-full p-1" />
            <DialogTitle className="text-xl">{CONFIG.dialog.successTitle}</DialogTitle>
            <DialogDescription>{CONFIG.dialog.successMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="justify-center">
            <Button
              className="w-full text-black bg-grey-700 hover:bg-grey-700"
              onClick={() => setShowDialog(false)}
            >
              {CONFIG.buttons.close}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
