import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

// ... 其他导入

export function YourDialog() {
  return (
    <Dialog>
      <DialogContent>
        {/* 添加 DialogTitle */}
        <DialogTitle>对话框标题</DialogTitle>
        
        {/* 如果你不想显示标题但又需要满足可访问性要求，可以这样做： */}
        <DialogTitle className="sr-only">对话框标题</DialogTitle>
        
        {/* 对话框的其他内容 */}
        <DialogDescription>
          这里是对话框的内容...
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
} 