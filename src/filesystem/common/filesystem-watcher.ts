import { injectable } from "inversify";
import { Emitter, Event } from '../../application/common';
import { FileSystemClient, FileChangesEvent } from './filesystem';

@injectable()
export class FileSystemWatcher {

    getFileSystemClient(): FileSystemClient {
        const emitter = this.onFileChangesEmitter
        return {
            onFileChanges(event: FileChangesEvent) {
                emitter.fire(event)
            }
        }
    }

    private onFileChangesEmitter = new Emitter<FileChangesEvent>();

    get onFileChanges(): Event<FileChangesEvent> {
        return this.onFileChangesEmitter.event;
    }

}