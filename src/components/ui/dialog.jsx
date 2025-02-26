import * as DialogPrimitive from "@radix-ui/react-dialog";

const Dialog = ({ children, onClose }) => {
  return (
    <DialogPrimitive.Root open={true} onOpenChange={onClose}>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
      <DialogPrimitive.Content className="fixed inset-0 flex items-center justify-center p-6">
        <div className="bg-white p-6 rounded-lg shadow-xl max-h-[500px] max-w-lg overflow-y-scroll">
          {children}
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Root>
  );
};

export default Dialog;
